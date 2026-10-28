import * as fs from 'node:fs';
import * as path from 'node:path';
import * as xmlJs from 'xml-js';
import { MusicXMLError } from '../../MusicXMLError';

/**
 * A reader for the subset of XML Schema that musicxml.xsd (and the xml.xsd and xlink.xsd it imports) uses: named
 * simple types built from restrictions and unions, complex types built from sequences, choices, group references and
 * element declarations, attribute groups, and the two top-level elements. It produces a plain model that
 * toSchemas.ts turns into descriptor schemas.
 */

export type Occurs = { min: number; max: number };

export type Particle =
	| { kind: 'element'; name: string; type: string | ComplexType; occurs: Occurs; doc: string }
	| { kind: 'group'; ref: string; occurs: Occurs }
	| { kind: 'sequence'; items: Particle[]; occurs: Occurs }
	| { kind: 'choice'; items: Particle[]; occurs: Occurs };

export type Attribute = {
	/** The attribute name as it appears in documents, prefixed for imported attributes (`xml:lang`). */
	name: string;
	type: string | SimpleType;
	required: boolean;
	fixed: string | null;
	default: string | null;
};

/** An attribute declaration or a reference to an attribute group, in the order they appear. */
export type AttributeItem = { kind: 'attribute'; attribute: Attribute } | { kind: 'group'; ref: string };

export type Restriction = {
	kind: 'restriction';
	base: string | SimpleType;
	enumerations: string[];
	pattern: string | null;
	minInclusive: number | null;
	maxInclusive: number | null;
	minExclusive: number | null;
	maxExclusive: number | null;
	minLength: number | null;
};

export type SimpleType = {
	name: string | null;
	doc: string;
	def: Restriction | { kind: 'union'; members: Array<string | SimpleType> };
};

export type ComplexType = {
	name: string | null;
	doc: string;
	/** The complex type this one extends, whose attributes and content come first. */
	base: string | null;
	attributes: AttributeItem[];
	content: { kind: 'empty' } | { kind: 'simple'; base: string } | { kind: 'particle'; particle: Particle };
};

export type Schema = {
	simpleTypes: Map<string, SimpleType>;
	complexTypes: Map<string, ComplexType>;
	groups: Map<string, Particle>;
	attributeGroups: Map<string, AttributeItem[]>;
	/** Top-level attributes, keyed by prefixed name (`xml:lang`, `xlink:href`). */
	attributes: Map<string, Attribute>;
	/** Top-level elements (`score-partwise` and `score-timewise`). */
	elements: Particle[];
};

type Node = xmlJs.Element;

const children = (node: Node, name?: string): Node[] =>
	(node.elements ?? []).filter((child) => child.type === 'element' && (!name || child.name === name));

const child = (node: Node, name: string): Node | null => children(node, name)[0] ?? null;

const attr = (node: Node, name: string): string | null => {
	const value = node.attributes?.[name];
	return value === undefined ? null : String(value);
};

const text = (node: Node): string =>
	(node.elements ?? [])
		.filter((child) => child.type === 'text')
		.map((child) => String(child.text ?? ''))
		.join('');

const doc = (node: Node): string => {
	const annotation = child(node, 'xs:annotation');
	if (!annotation) {
		return '';
	}
	return children(annotation, 'xs:documentation')
		.map((documentation) => text(documentation).trim())
		.join('\n\n');
};

const occurs = (node: Node): Occurs => {
	const min = attr(node, 'minOccurs') ?? '1';
	const max = attr(node, 'maxOccurs') ?? '1';
	return {
		min: Number.parseInt(min, 10),
		max: max === 'unbounded' ? Number.POSITIVE_INFINITY : Number.parseInt(max, 10),
	};
};

const number = (node: Node | null): number | null => (node ? Number.parseFloat(attr(node, 'value') ?? '') : null);

const readSimpleType = (node: Node): SimpleType => {
	const name = attr(node, 'name');
	const restriction = child(node, 'xs:restriction');
	const union = child(node, 'xs:union');
	if (restriction) {
		const inline = child(restriction, 'xs:simpleType');
		return {
			name,
			doc: doc(node),
			def: {
				kind: 'restriction',
				base: inline ? readSimpleType(inline) : (attr(restriction, 'base') ?? fail('restriction without a base', node)),
				enumerations: children(restriction, 'xs:enumeration').map((e) => attr(e, 'value') ?? ''),
				pattern: attr(child(restriction, 'xs:pattern') ?? { type: 'element' }, 'value'),
				minInclusive: number(child(restriction, 'xs:minInclusive')),
				maxInclusive: number(child(restriction, 'xs:maxInclusive')),
				minExclusive: number(child(restriction, 'xs:minExclusive')),
				maxExclusive: number(child(restriction, 'xs:maxExclusive')),
				minLength: number(child(restriction, 'xs:minLength')),
			},
		};
	}
	if (union) {
		const members: Array<string | SimpleType> = (attr(union, 'memberTypes') ?? '').split(/\s+/).filter(Boolean);
		members.push(...children(union, 'xs:simpleType').map(readSimpleType));
		return { name, doc: doc(node), def: { kind: 'union', members } };
	}
	return fail('unsupported simple type', node);
};

const readAttribute = (node: Node, prefix: string): Attribute => {
	const ref = attr(node, 'ref');
	const inline = child(node, 'xs:simpleType');
	const name = ref ?? `${prefix}${attr(node, 'name') ?? fail('attribute without a name', node)}`;
	let type: string | SimpleType;
	if (inline) {
		// An attribute's own simple type takes the attribute's name, so aliases can refer to it.
		type = { ...readSimpleType(inline), name };
	} else {
		type = attr(node, 'type') ?? ref ?? fail('attribute without a type', node);
	}
	return {
		name,
		type,
		required: attr(node, 'use') === 'required',
		fixed: attr(node, 'fixed'),
		default: attr(node, 'default'),
	};
};

/** Reads the attributes and attribute group references declared directly on a node. */
const readAttributes = (node: Node, prefix: string): AttributeItem[] => {
	const items: AttributeItem[] = [];
	for (const item of children(node)) {
		if (item.name === 'xs:attribute') {
			items.push({ kind: 'attribute', attribute: readAttribute(item, prefix) });
		} else if (item.name === 'xs:attributeGroup') {
			items.push({ kind: 'group', ref: attr(item, 'ref') ?? fail('attribute group without a ref', item) });
		}
	}
	return items;
};

const readParticle = (node: Node, prefix: string): Particle => {
	switch (node.name) {
		case 'xs:element': {
			const ref = attr(node, 'ref');
			if (ref) {
				return fail('element references are not supported', node);
			}
			const name = attr(node, 'name') ?? fail('element without a name', node);
			const inline = child(node, 'xs:complexType');
			const type = inline ? readComplexType(inline, prefix) : attr(node, 'type');
			if (type === null) {
				// An element with neither a type nor an inline complex type is empty (<xs:element name="x"/>).
				return {
					kind: 'element',
					name,
					type: { name: null, doc: doc(node), base: null, attributes: [], content: { kind: 'empty' } },
					occurs: occurs(node),
					doc: doc(node),
				};
			}
			return { kind: 'element', name, type, occurs: occurs(node), doc: doc(node) };
		}
		case 'xs:group':
			return { kind: 'group', ref: attr(node, 'ref') ?? fail('group without a ref', node), occurs: occurs(node) };
		case 'xs:sequence':
		case 'xs:choice':
			return {
				kind: node.name === 'xs:sequence' ? 'sequence' : 'choice',
				items: children(node)
					.filter((item) => item.name !== 'xs:annotation')
					.map((item) => readParticle(item, prefix)),
				occurs: occurs(node),
			};
	}
	return fail('unsupported particle', node);
};

const readComplexType = (node: Node, prefix: string): ComplexType => {
	const name = attr(node, 'name');
	const simpleContent = child(node, 'xs:simpleContent');
	const complexContent = child(node, 'xs:complexContent');
	if (simpleContent) {
		const extension = child(simpleContent, 'xs:extension') ?? fail('simple content without an extension', node);
		return {
			name,
			doc: doc(node),
			base: null,
			attributes: readAttributes(extension, prefix),
			content: { kind: 'simple', base: attr(extension, 'base') ?? fail('extension without a base', node) },
		};
	}
	if (complexContent) {
		// Only extensions of another complex type appear: the base's attributes and content come first.
		const extension = child(complexContent, 'xs:extension') ?? fail('complex content without an extension', node);
		const base = attr(extension, 'base') ?? fail('extension without a base', node);
		const particle = children(extension).find((item) =>
			['xs:sequence', 'xs:choice', 'xs:group'].includes(item.name ?? ''),
		);
		return {
			name,
			doc: doc(node),
			base,
			attributes: readAttributes(extension, prefix),
			content: particle ? { kind: 'particle', particle: readParticle(particle, prefix) } : { kind: 'empty' },
		};
	}
	const particle = children(node).find((item) => ['xs:sequence', 'xs:choice', 'xs:group'].includes(item.name ?? ''));
	return {
		name,
		doc: doc(node),
		base: null,
		attributes: readAttributes(node, prefix),
		content: particle ? { kind: 'particle', particle: readParticle(particle, prefix) } : { kind: 'empty' },
	};
};

const fail = (message: string, node: Node): never => {
	throw new MusicXMLError(`xsd: ${message}`, { node: JSON.stringify(node).slice(0, 500) });
};

/**
 * Reads an XSD file. Imported schemas are read too; their top-level attributes are keyed by the prefix the importing
 * schema declares for their namespace.
 */
export const read = (xsdPath: string): Schema => {
	const schema: Schema = {
		simpleTypes: new Map(),
		complexTypes: new Map(),
		groups: new Map(),
		attributeGroups: new Map(),
		attributes: new Map(),
		elements: [],
	};
	readInto(schema, xsdPath, '');
	return schema;
};

const readInto = (schema: Schema, xsdPath: string, prefix: string): void => {
	const root =
		child(xmlJs.xml2js(fs.readFileSync(xsdPath, 'utf8')) as Node, 'xs:schema') ??
		fail('no xs:schema', { type: 'element' });

	const prefixes = new Map<string, string>();
	for (const [key, value] of Object.entries(root.attributes ?? {})) {
		if (key.startsWith('xmlns:')) {
			prefixes.set(String(value), `${key.slice('xmlns:'.length)}:`);
		}
	}
	// The XML namespace is never declared; its conventional prefix is fixed.
	prefixes.set('http://www.w3.org/XML/1998/namespace', 'xml:');

	for (const node of children(root)) {
		switch (node.name) {
			case 'xs:import': {
				const namespace = attr(node, 'namespace') ?? '';
				const location = attr(node, 'schemaLocation') ?? fail('import without a location', node);
				readInto(
					schema,
					path.join(path.dirname(xsdPath), location),
					prefixes.get(namespace) ?? fail('import with an undeclared namespace', node),
				);
				break;
			}
			case 'xs:simpleType': {
				const simpleType = readSimpleType(node);
				schema.simpleTypes.set(`${prefix}${simpleType.name}`, simpleType);
				break;
			}
			case 'xs:complexType': {
				const complexType = readComplexType(node, prefix);
				schema.complexTypes.set(`${prefix}${complexType.name}`, complexType);
				break;
			}
			case 'xs:group':
				schema.groups.set(
					`${prefix}${attr(node, 'name')}`,
					readParticle(
						children(node).find((item) => item.name !== 'xs:annotation') ?? fail('empty group', node),
						prefix,
					),
				);
				break;
			case 'xs:attributeGroup':
				schema.attributeGroups.set(`${prefix}${attr(node, 'name')}`, readAttributes(node, prefix));
				break;
			case 'xs:attribute': {
				const attribute = readAttribute(node, prefix);
				schema.attributes.set(attribute.name, attribute);
				break;
			}
			case 'xs:element':
				schema.elements.push(readParticle(node, prefix));
				break;
		}
	}
};
