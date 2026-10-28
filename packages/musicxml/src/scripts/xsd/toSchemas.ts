import * as operations from '../../lib/operations';
import { type Descriptor, type DescriptorChild, t, type XMLElementSchema } from '../../lib/schema';
import { MusicXMLError } from '../../MusicXMLError';
import type { Aliases } from '../aliases';
import type { Attribute, AttributeItem, ComplexType, Occurs, Particle, Schema, SimpleType } from './read';

/**
 * Turns the XSD model into the descriptor schemas the generator consumes: one XMLElementSchema per element class,
 * keyed by class name, with the aliases supplying the names the XSD leaves out.
 */
export type Schemas = {
	schemas: Record<string, XMLElementSchema>;
	/** The XSD documentation of each element, keyed by class name. */
	docs: Record<string, string>;
	/** Content that needs a name the aliases do not give, as `element: path (shape)`. */
	missing: string[];
};

const toPascalCase = (name: string): string =>
	name
		.split('-')
		.map((part) => (part.length > 0 ? part[0].toUpperCase() + part.slice(1) : part))
		.join('');

/** The xs:ID and xs:IDREF built-ins, which the engine models as a pattern. */
const ID = () => t.regex({ pattern: /[A-Za-z_][A-Za-z0-9.-_]*/, zero: '_' });

const BUILTINS: Record<string, () => Descriptor> = {
	'xs:string': () => t.string(),
	'xs:token': () => t.string(),
	'xs:NMTOKEN': () => t.string(),
	'xs:NCName': () => t.string(),
	'xs:anyURI': () => t.string(),
	'xs:language': () => t.string(),
	'xs:ID': ID,
	'xs:IDREF': ID,
	'xs:date': () => t.date(),
	'xs:decimal': () => t.float(),
	'xs:integer': () => t.int(),
	'xs:positiveInteger': () => t.int({ min: 1 }),
	'xs:nonNegativeInteger': () => t.int({ min: 0 }),
};

/** XML Schema regular expressions add `\\c` (a name character) and `\\i` (a name start character) to the usual syntax. */
const toJsPattern = (pattern: string): string => pattern.replace(/\\c/g, '[\\w.:-]').replace(/\\i/g, '[A-Za-z_:]');

const isStringLike = (descriptor: Descriptor): boolean =>
	descriptor.type === 'string' || descriptor.type === 'regex' || descriptor.type === 'not';

/** Marks content the generator names after its element, needing no label. */
const ELEMENT_NAMED = '\0element';

const plural = (name: string): string => (name.endsWith('s') ? name : `${name}s`);

export const toSchemas = (xsd: Schema, aliases: Aliases): Schemas => {
	const schemas: Record<string, XMLElementSchema> = {};
	const docs: Record<string, string> = {};
	const missing: string[] = [];

	const simpleTypes = new Map<string, Descriptor>();

	const simple = (ref: string | SimpleType): Descriptor => {
		if (typeof ref !== 'string') {
			return fromSimpleType(ref);
		}
		if (ref in aliases.compat.simpleTypes) {
			return aliases.compat.simpleTypes[ref]();
		}
		if (ref in BUILTINS) {
			return BUILTINS[ref]();
		}
		const simpleType = xsd.simpleTypes.get(ref);
		if (!simpleType) {
			throw new MusicXMLError('unknown simple type', { ref });
		}
		if (!simpleTypes.has(ref)) {
			simpleTypes.set(ref, fromSimpleType(simpleType));
		}
		return simpleTypes.get(ref)!;
	};

	/**
	 * A choices descriptor whose first choice gives the type's zero value: the one the aliases name, or the XSD's
	 * first.
	 */
	const choices = (options: Array<string | Descriptor>, name: string | null): Descriptor => {
		const zero = name === null ? undefined : aliases.zeros[name];
		if (zero !== undefined) {
			const index = options.findIndex((option) => operations.validate(zero, option));
			if (index < 0) {
				throw new MusicXMLError('the zero value in aliases.zeros is not one of the choices', { name, zero });
			}
			const first = options[index];
			options = [
				typeof first === 'object' && first.type === 'choices' ? choices(first.choices, name) : first,
				...options.filter((_, ndx) => ndx !== index),
			];
		}
		return t.choices(...(options as [string | Descriptor, ...Array<string | Descriptor>]));
	};

	const fromSimpleType = (simpleType: SimpleType): Descriptor => {
		const def = simpleType.def;
		if (def.kind === 'union') {
			const members = def.members.map(simple);
			// A union with a plain string in it accepts any string.
			return members.some((member) => member.type === 'string') ? t.string() : choices(members, simpleType.name);
		}
		const base = simple(def.base);
		if (def.enumerations.length > 0) {
			return choices(def.enumerations, simpleType.name);
		}
		if (def.pattern !== null && base.type !== 'date') {
			const zero = simpleType.name === null ? undefined : aliases.zeros[simpleType.name];
			if (zero === undefined) {
				throw new MusicXMLError('a pattern type needs a zero value in aliases.zeros', { name: simpleType.name });
			}
			return t.regex({ pattern: new RegExp(toJsPattern(def.pattern)), zero: String(zero) });
		}
		if (def.minLength !== null) {
			if (def.minLength !== 1) {
				throw new MusicXMLError('only minLength 1 is supported', { name: simpleType.name });
			}
			return t.not({ include: base, exclude: t.constant('') });
		}
		if (base.type === 'int' || base.type === 'float') {
			const opts = { min: base.min, max: base.max };
			if (def.minInclusive !== null) {
				opts.min = def.minInclusive;
			}
			if (def.maxInclusive !== null) {
				opts.max = def.maxInclusive;
			}
			// The engine has no exclusive bounds: an integer bound moves by one, a decimal bound stays inclusive.
			if (def.minExclusive !== null) {
				opts.min = base.type === 'int' ? def.minExclusive + 1 : def.minExclusive;
			}
			if (def.maxExclusive !== null) {
				opts.max = base.type === 'int' ? def.maxExclusive - 1 : def.maxExclusive;
			}
			const finite = {
				min: Number.isFinite(opts.min) ? opts.min : undefined,
				max: Number.isFinite(opts.max) ? opts.max : undefined,
			};
			return base.type === 'int' ? t.int(finite) : t.float(finite);
		}
		return base;
	};

	const complexType = (ref: string | ComplexType): ComplexType => {
		if (typeof ref !== 'string') {
			return ref;
		}
		const found = xsd.complexTypes.get(ref);
		if (found) {
			return found;
		}
		// An element declared with a simple type has that text and no attributes.
		if (ref in BUILTINS || xsd.simpleTypes.has(ref)) {
			return {
				name: ref,
				doc: xsd.simpleTypes.get(ref)?.doc ?? '',
				base: null,
				attributes: [],
				content: { kind: 'simple', base: ref },
			};
		}
		throw new MusicXMLError('unknown complex type', { ref });
	};

	const attributeItems = (items: AttributeItem[]): Attribute[] =>
		items.flatMap((item) => {
			if (item.kind === 'attribute') {
				return [item.attribute];
			}
			const group = xsd.attributeGroups.get(item.ref);
			if (!group) {
				throw new MusicXMLError('unknown attribute group', { ref: item.ref });
			}
			return attributeItems(group);
		});

	const attributes = (type: ComplexType, elementName: string): Record<string, Descriptor> => {
		const all = [
			...(type.base ? attributeItems(complexType(type.base).attributes) : []),
			...attributeItems(type.attributes),
		];
		const result: Record<string, Descriptor> = {};
		for (const attribute of all.sort((a, b) => a.name.localeCompare(b.name))) {
			const declared =
				typeof attribute.type === 'string' && attribute.type === attribute.name
					? xsd.attributes.get(attribute.name)
					: null;
			const value = simple(declared ? declared.type : attribute.type);
			const compat = aliases.compat.attributes[`${elementName}@${attribute.name}`];
			if (compat) {
				result[attribute.name] = compat();
			} else {
				result[attribute.name] = attribute.required ? t.required(value) : t.optional(value);
			}
		}
		for (const [key, compat] of Object.entries(aliases.compat.attributes)) {
			const [element, name] = key.split('@');
			if (element === elementName && !(name in result)) {
				result[name] = compat();
			}
		}
		return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
	};

	/** Wraps a converted particle in the descriptor its occurrence constraints call for. */
	const withOccurs = (inner: DescriptorChild, occurs: Occurs): DescriptorChild => {
		const { min, max } = occurs;
		const isElement = typeof inner === 'object' && inner !== null && 'name' in inner;
		if (min === 1 && max === 1) {
			return isElement ? t.required(inner) : inner;
		}
		if (min === 0 && max === 1) {
			return t.optional(inner);
		}
		if (max === Number.POSITIVE_INFINITY) {
			if (min === 0) {
				return t.zeroOrMore(inner);
			}
			if (min === 1) {
				return t.oneOrMore(inner);
			}
		}
		if (Number.isFinite(max) && max > 1) {
			const tuples: DescriptorChild[] = [];
			for (let count = min; count <= max; count++) {
				tuples.push(Array.from({ length: count }, () => inner));
			}
			return t.choices(...(tuples as [DescriptorChild, ...DescriptorChild[]]));
		}
		throw new MusicXMLError('unsupported occurrence', { occurs });
	};

	/** The items of a sequence, with groups and plain nested sequences spliced in. */
	const flatten = (items: Particle[], path: string[]): DescriptorChild[] =>
		items.flatMap((item) => {
			if (item.kind === 'group' && item.occurs.min === 1 && item.occurs.max === 1) {
				const group = xsd.groups.get(item.ref) ?? fail('unknown group', item.ref);
				return group.kind === 'sequence' ? flatten(group.items, path) : [convert(group, path)];
			}
			if (item.kind === 'sequence' && item.occurs.min === 1 && item.occurs.max === 1) {
				return flatten(item.items, path);
			}
			return [convert(item, path)];
		});

	/** A sequence's items as one child: the lone item itself, or the array of them. */
	const sequence = (items: DescriptorChild[]): DescriptorChild => {
		if (items.length === 1) {
			const item = items[0];
			return typeof item === 'object' && item !== null && 'type' in item && item.type === 'required'
				? item.value
				: item;
		}
		return items;
	};

	const convert = (particle: Particle, path: string[]): DescriptorChild => {
		switch (particle.kind) {
			case 'element':
				return withOccurs(element(particle, path), particle.occurs);
			case 'group': {
				const group = xsd.groups.get(particle.ref) ?? fail('unknown group', particle.ref);
				return withOccurs(
					group.kind === 'sequence'
						? sequence(flatten(group.items, path))
						: convert({ ...group, occurs: { min: 1, max: 1 } }, path),
					particle.occurs,
				);
			}
			case 'sequence':
				return withOccurs(sequence(flatten(particle.items, path)), particle.occurs);
			case 'choice':
				return withOccurs(
					t.choices(...(particle.items.map((item) => branch(item, path)) as [DescriptorChild, ...DescriptorChild[]])),
					particle.occurs,
				);
		}
	};

	/** A choice branch: a bare element, or the converted sequence. */
	const branch = (particle: Particle, path: string[]): DescriptorChild => {
		if (particle.kind === 'element' && particle.occurs.min === 1 && particle.occurs.max === 1) {
			return element(particle, path);
		}
		return convert(particle, path);
	};

	const element = (particle: Extract<Particle, { kind: 'element' }>, path: string[]): XMLElementSchema => {
		const elementPath = [...path, particle.name];
		const className = aliases.classNames[elementPath.join('/')] ?? particle.name;
		const key = toPascalCase(className);
		if (key in schemas) {
			return schemas[key];
		}
		const type = complexType(particle.type);
		const schema: XMLElementSchema = { name: particle.name, attributes: attributes(type, particle.name), contents: [] };
		if (className !== particle.name) {
			schema.className = className;
		}
		schemas[key] = schema;
		docs[key] = particle.doc || type.doc;
		schema.contents = contents(type, particle.name, elementPath);
		return schema;
	};

	const contents = (type: ComplexType, elementName: string, path: string[]): Descriptor[] => {
		const override = aliases.contents[elementName] ?? aliases.compat.contents[elementName];
		if (override) {
			return override(el).map((item, index) => name(item, elementName, `${index}`)) as Descriptor[];
		}
		const items: DescriptorChild[] = [];
		if (type.base) {
			items.push(...contents(complexType(type.base), elementName, path));
		}
		switch (type.content.kind) {
			case 'empty':
				break;
			case 'simple': {
				const value = simple(type.content.base);
				const base = type.content.base;
				let label = base;
				if (isStringLike(value)) {
					label = 'text';
				} else if (base in BUILTINS) {
					label = 'value';
				}
				items.push(
					t.label({
						label,
						value: aliases.compat.optionalText.includes(elementName) ? t.optional(value) : t.required(value),
					}),
				);
				break;
			}
			case 'particle': {
				// A top-level sequence or group is the element's content itself; anything else is one content item.
				items.push(...flatten([type.content.particle], path));
			}
		}
		return items.map((item, index) => name(item, elementName, `${index}`)) as Descriptor[];
	};

	/** Labels a top-level content item, and any choice branches under it the aliases name. */
	const name = (item: DescriptorChild, elementName: string, path: string): DescriptorChild => {
		const names = aliases.names[elementName] ?? {};
		const labeled = labelBranches(item, names, path);
		const alias = names[path];
		if (alias !== undefined) {
			return t.label({ label: alias, value: unlabel(labeled) });
		}
		const fallback = defaultName(labeled);
		if (fallback === null) {
			missing.push(`${elementName}: ${path} (${describe(labeled)})`);
			return labeled;
		}
		if (fallback === ELEMENT_NAMED) {
			return labeled;
		}
		return t.label({ label: fallback, value: labeled });
	};

	const labelBranches = (item: DescriptorChild, names: Record<string, string>, path: string): DescriptorChild => {
		if (Array.isArray(item)) {
			return item.map((child, index) => labelBranches(child, names, `${path}.${index}`));
		}
		if (typeof item !== 'object' || item === null || !('type' in item) || Array.isArray(item)) {
			return item;
		}
		switch (item.type) {
			case 'optional':
			case 'required':
			case 'zeroOrMore':
			case 'oneOrMore':
			case 'label':
				return { ...item, value: labelBranches(item.value, names, path) };
			case 'choices':
				return t.choices(
					...(item.choices.map((choice: DescriptorChild, index: number) => {
						const branchPath = `${path}.${index}`;
						const labeled = labelBranches(choice, names, branchPath);
						return branchPath in names ? t.label({ label: names[branchPath], value: unlabel(labeled) }) : labeled;
					}) as [DescriptorChild, ...DescriptorChild[]]),
				);
			default:
				return item;
		}
	};

	/** The item without the label an override may already have given it. */
	const unlabel = (item: DescriptorChild): DescriptorChild =>
		typeof item === 'object' && item !== null && !Array.isArray(item) && 'type' in item && item.type === 'label'
			? item.value
			: item;

	/** The name the generator derives on its own, ELEMENT_NAMED when the element's own name serves, or null. */
	const defaultName = (item: DescriptorChild): string | null => {
		if (typeof item !== 'object' || item === null || Array.isArray(item) || !('type' in item)) {
			return typeof item === 'object' && item !== null && 'name' in item ? ELEMENT_NAMED : null;
		}
		switch (item.type) {
			case 'label':
				return ELEMENT_NAMED;
			case 'optional':
			case 'required':
				return typeof item.value === 'object' && item.value !== null && 'name' in item.value
					? ELEMENT_NAMED
					: defaultName(item.value);
			case 'zeroOrMore':
			case 'oneOrMore': {
				const value = item.value;
				if (typeof value === 'object' && value !== null && 'name' in value) {
					return plural(value.name);
				}
				if (typeof value === 'object' && value !== null && 'type' in value && value.type === 'choices') {
					return 'values';
				}
				return null;
			}
			case 'choices': {
				// A bounded repetition of one element, as tuples of it.
				const first = item.choices.find((choice: DescriptorChild) => Array.isArray(choice) && choice.length > 0);
				return first && 'name' in first[0] ? plural(first[0].name) : null;
			}
			default:
				return null;
		}
	};

	const describe = (item: DescriptorChild): string => {
		if (Array.isArray(item)) {
			return `[${item.map(describe).join(', ')}]`;
		}
		if (typeof item !== 'object' || item === null || Array.isArray(item)) {
			return JSON.stringify(item);
		}
		if ('name' in item) {
			return `<${item.name}>`;
		}
		const descriptor = item as Descriptor;
		switch (descriptor.type) {
			case 'choices':
				return `choices(${descriptor.choices.map(describe).join(' | ')})`;
			case 'optional':
			case 'required':
			case 'zeroOrMore':
			case 'oneOrMore':
				return `${descriptor.type}(${describe(descriptor.value)})`;
			case 'label':
				return `${descriptor.label}: ${describe(descriptor.value)}`;
			default:
				return descriptor.type;
		}
	};

	const fail = (message: string, ref: string): never => {
		throw new MusicXMLError(message, { ref });
	};

	/** Every element declaration by name, for the content overrides to refer to elements by name. */
	const declarations = new Map<string, Extract<Particle, { kind: 'element' }>>();
	const index = (particle: Particle): void => {
		switch (particle.kind) {
			case 'element':
				if (!declarations.has(particle.name)) {
					declarations.set(particle.name, particle);
				}
				if (typeof particle.type !== 'string' && particle.type.content.kind === 'particle') {
					index(particle.type.content.particle);
				}
				break;
			case 'sequence':
			case 'choice':
				particle.items.forEach(index);
				break;
		}
	};
	for (const type of Array.from(xsd.complexTypes.values())) {
		if (type.content.kind === 'particle') {
			index(type.content.particle);
		}
	}
	Array.from(xsd.groups.values()).forEach(index);
	xsd.elements.forEach(index);

	const el = (name: string): XMLElementSchema => {
		const declaration = declarations.get(name);
		if (!declaration) {
			throw new MusicXMLError('unknown element', { name });
		}
		return element(declaration, []);
	};

	for (const root of xsd.elements) {
		if (root.kind === 'element') {
			element(root, []);
		}
	}

	return { schemas, docs, missing };
};
