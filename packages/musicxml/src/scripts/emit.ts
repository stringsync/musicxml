import type { DescriptorChild, XMLElementSchema } from '../lib/schema';
import * as util from '../lib/util';
import { MusicXMLError } from '../MusicXMLError';

const capitalize = (string: string): string => {
	return string.length > 0 ? string[0].toUpperCase() + string.substring(1) : string;
};

const uncapitalize = (string: string): string => {
	return string.length > 0 ? string[0].toLowerCase() + string.substring(1) : string;
};

const decolonize = (string: string): string => {
	return string.replace(/:/g, '-');
};

const toPascalCase = (string: string): string => {
	return string.split('-').map(capitalize).join('');
};

const toCamelCase = (string: string): string => {
	return uncapitalize(toPascalCase(string));
};

export const getClassName = (schema: XMLElementSchema): string => {
	return schema.className ? toPascalCase(schema.className) : toPascalCase(schema.name);
};

export const getLabeledTypeLiterals = (schema: XMLElementSchema): string => {
	const literals: string[] = [];

	const dfs = (child: DescriptorChild) => {
		if (util.isDescriptor(child)) {
			switch (child.type) {
				case 'label':
				case 'optional':
				case 'required':
				case 'zeroOrMore':
				case 'oneOrMore':
					dfs(child.value);
					break;
				case 'choices':
					for (const choice of child.choices) {
						if (util.isDescriptor(choice) && choice.type === 'label') {
							const typeName = getChoiceTypeName(choice);
							const typeLiteral = getTypeLiteral(choice.value);
							literals.push(`export type ${typeName} = ${typeLiteral};`);
						}
						dfs(choice);
					}
					break;
			}
		}
		if (util.isArray(child)) {
			child.forEach(dfs);
		}
	};

	dfs(schema.contents);
	return literals.join('\n\n');
};

export const getChoiceTypeName = (child: DescriptorChild): string => {
	if (util.isDescriptor(child) && child.type === 'label') {
		return toPascalCase(child.label);
	}
	return getTypeLiteral(child);
};

export const getTypeLiteral = (child: DescriptorChild): string => {
	if (util.isString(child)) {
		return `'${child}'`;
	}
	if (util.isNumber(child)) {
		return child.toString();
	}
	if (util.isDescriptor(child)) {
		switch (child.type) {
			case 'string':
			case 'regex':
				return 'string';
			case 'int':
			case 'float':
				return 'number';
			case 'date':
				return 'Date';
			case 'constant':
				return getTypeLiteral(child.value);
			case 'choices':
				return child.choices.map(getChoiceTypeName).join(' | ');
			case 'optional':
				return `${getTypeLiteral(child.value)} | null`;
			case 'required':
				return getTypeLiteral(child.value);
			case 'label':
				return getTypeLiteral(child.value);
			case 'zeroOrMore':
			case 'oneOrMore':
				return `Array<${getTypeLiteral(child.value)}>`;
			case 'not':
				return `Exclude<${getTypeLiteral(child.include)}, ${getTypeLiteral(child.exclude)}>`;
		}
	}
	if (util.isXMLElementSchema(child)) {
		return getClassName(child);
	}
	if (util.isFunction(child)) {
		return getTypeLiteral(child());
	}
	if (util.isArray(child)) {
		return `[${child.map(getTypeLiteral).join(', ')}]`;
	}
	throw new MusicXMLError('cannot compute type for value', { child });
};

export const getAttributesTypeLiteral = (schema: XMLElementSchema): string => {
	const attributes: string[] = [];
	for (const [key, value] of Object.entries(schema.attributes)) {
		const declaration = `'${key}': ${getTypeLiteral(value as DescriptorChild)}`;

		attributes.push(declaration);
	}
	return attributes.length > 0 ? `{ ${attributes.join(';\n')} }` : 'Record<string, unknown>';
};

export const getContentsTypeLiteral = (schema: XMLElementSchema): string => {
	const contents: string[] = [];
	for (const content of schema.contents) {
		contents.push(getTypeLiteral(content));
	}
	return `[${contents.join(', ')}]`;
};

const getAttributeLabel = (child: DescriptorChild): string => {
	if (util.isDescriptor(child)) {
		switch (child.type) {
			case 'label':
				return child.label;
			case 'optional':
			case 'required':
				return getAttributeLabel(child.value);
		}
	}
	return '';
};

/** Attribute labels preserve accessor names when an attribute and a child share a name. */
export const getAttributeAccessorNames = (schema: XMLElementSchema): Record<string, string> =>
	Object.fromEntries(Object.entries(schema.attributes).map(([key, value]) => [key, getAttributeLabel(value) || key]));

const propertyAccess = (key: string): string =>
	/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? `.${key}` : `[${JSON.stringify(key)}]`;

export const getAttributeAccessorMethodLiterals = (schema: XMLElementSchema): string => {
	const methods: string[] = [];
	const className = getClassName(schema);
	for (const [key, value] of Object.entries(schema.attributes)) {
		const name = getAttributeLabel(value) || key;
		const typeLiteral = getTypeLiteral(value);
		methods.push(`/** Gets @type {${className}Attributes['${key}']}. */`);
		methods.push(
			`get${toPascalCase(decolonize(name))}(): ${typeLiteral} { return this.attributes${propertyAccess(key)}; }`,
		);
		methods.push(`/** Sets @type {${className}Attributes['${key}']}. */`);
		methods.push(
			`set${toPascalCase(decolonize(name))}(${toCamelCase(
				decolonize(name),
			)}: ${typeLiteral}): ${className} { this.attributes${propertyAccess(key)} = ${toCamelCase(decolonize(name))}; return this; }`,
		);
	}
	return methods.join('\n');
};

/** Emit shared descriptor trees without copying their inferred types into declarations. */
const toSchemaFile = (schemas: XMLElementSchema[]): string => {
	const shared = new Map<string, string>();
	const declarations: string[] = [];

	const literal = (value: any): string => {
		if (value instanceof RegExp) {
			return value.toString();
		}
		if (util.isString(value)) {
			return JSON.stringify(value);
		}
		if (util.isNumber(value)) {
			return value.toString();
		}
		if (util.isNull(value)) {
			return 'null';
		}
		if (util.isFunction(value)) {
			return literal(value());
		}
		if (util.isArray(value)) {
			const refs: string[] = [];
			const items = value.map((child, index) => {
				const resolved = util.isFunction(child) ? child() : child;
				if (util.isXMLElementSchema(resolved)) {
					refs.push(`${index}: () => constructors.${getClassName(resolved)}`);
					return 'null';
				}
				return literal(resolved);
			});
			const array = `[${items.join(', ')}]`;
			return refs.length ? `withElements(${array}, { ${refs.join(', ')} })` : array;
		}
		if (util.isObject(value)) {
			const fields = Object.entries(value).map(([key, child]) => {
				const resolved = util.isFunction(child) ? child() : child;
				// Getters keep the actual constructor in the descriptor while allowing the
				// schema module to load before the element classes have been initialized.
				return util.isXMLElementSchema(resolved)
					? `get ${JSON.stringify(key)}() { return constructors.${getClassName(resolved)}; }`
					: `${JSON.stringify(key)}: ${literal(resolved)}`;
			});
			const body = `{ ${fields.join(', ')} }`;
			let name = shared.get(body);
			if (!name) {
				name = `shared${shared.size}`;
				shared.set(body, name);
				const type = util.isDescriptor(value) ? 'Descriptor' : 'Record<string, Descriptor>';
				declarations.push(`const ${name}: ${type} = ${body};`);
			}
			return name;
		}
		throw new MusicXMLError('cannot compute literal', { value });
	};

	const entries = schemas.map((schema) => {
		const attributes = literal(schema.attributes);
		const contents = literal(schema.contents);
		return `${getClassName(schema)}: { name: ${JSON.stringify(schema.name)}, attributes: ${attributes}, contents: ${contents} }`;
	});
	const types = schemas.map((schema) => `${getClassName(schema)}: XMLElementSchema<${JSON.stringify(schema.name)}>;`);
	return [
		`import type { Descriptor, XMLElementCtor, XMLElementSchema } from '../lib/schema';`,
		`const constructors: Record<string, XMLElementCtor> = {};
export const registerElement = (name: string, element: XMLElementCtor): void => {
  constructors[name] = element;
};`,
		`// Array entries, like object fields, resolve constructors only after the classes load.
const withElements = (values: any[], refs: Record<number, () => XMLElementCtor>): any => {
  for (const [index, get] of Object.entries(refs)) {
    Object.defineProperty(values, index, { get, enumerable: true, configurable: true });
  }
  return values;
};`,
		...declarations,
		`export const schema: { ${types.join('\n')} } = { ${entries.join(',\n')} };`,
	].join('\n\n');
};

/** The accessor name of each top-level content item: `getX`/`setX` for content item `x`. */
export const getContentsAccessorNames = (schema: XMLElementSchema): string[] => {
	const contents = schema.contents;

	const hasTextNode = (child: DescriptorChild): boolean => {
		if (util.isDescriptor(child)) {
			switch (child.type) {
				case 'string':
				case 'regex':
					return true;
				case 'optional':
				case 'required':
				case 'label':
					return hasTextNode(child.value);
			}
		}
		return false;
	};

	const getAccessorName = (child: DescriptorChild): string => {
		if (util.isDescriptor(child)) {
			switch (child.type) {
				case 'string':
				case 'regex':
					return 'text';
				case 'optional':
				case 'required':
					return getAccessorName(child.value);
				case 'label':
					return child.label;
			}
		}
		if (util.isXMLElementSchema(child)) {
			return child.name;
		}
		throw new MusicXMLError('cannot compute content accessor name', { child, elementName: schema.name });
	};

	let numTextNodes = 0;
	for (const content of contents) {
		if (hasTextNode(content)) {
			numTextNodes++;
		}
	}
	if (numTextNodes > 1) {
		throw new MusicXMLError('too many text nodes', { numTextNodes, factory: schema });
	}

	return contents.map(getAccessorName);
};

export const getContentsAccessorMethodLiterals = (schema: XMLElementSchema): string => {
	const contents = schema.contents;
	const accessorNames = getContentsAccessorNames(schema);
	const methods: string[] = [];
	for (let ndx = 0; ndx < contents.length; ndx++) {
		const accessorName = accessorNames[ndx];
		methods.push(`/** Gets @type {${getTypeLiteral(contents[ndx])}}. */`);
		methods.push(
			`get${toPascalCase(accessorName)}(): ${getTypeLiteral(contents[ndx])} { return this.contents[${ndx}]; }`,
		);
		methods.push(`/** Sets @type {${getTypeLiteral(contents[ndx])}}. */`);
		methods.push(
			`set${toPascalCase(accessorName)}(${toCamelCase(accessorName)}: ${getTypeLiteral(
				contents[ndx],
			)}): this { this.contents[${ndx}] = ${toCamelCase(accessorName)}; return this; }`,
		);
	}
	return methods.join('\n');
};

const toClassLiteral = (schema: XMLElementSchema, docs: Record<string, string>): string => {
	const className = getClassName(schema);
	const classComment = toMultiLineComment(
		`The \`<${schema.name}>\` element.\n\n${docs[className] ?? ''}\n\n@see https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/${schema.name}/`,
	);

	const labeledTypeLiterals = getLabeledTypeLiterals(schema);

	const attributesTypeName = `${className}Attributes`;
	const attributesTypeLiteral = getAttributesTypeLiteral(schema);
	const attributesAccessorMethodLiterals = getAttributeAccessorMethodLiterals(schema);

	const contentsTypeName = `${className}Contents`;
	const contentsTypeLiteral = getContentsTypeLiteral(schema);
	const contentsAccessorMethodLiterals = getContentsAccessorMethodLiterals(schema);

	return `
${labeledTypeLiterals}

export type ${attributesTypeName} = ${attributesTypeLiteral};

export type ${contentsTypeName} = ${contentsTypeLiteral};

${classComment}
export class ${className} implements XMLElement<'${schema.name}', ${attributesTypeName}, ${contentsTypeName}> {
  static readonly schema: XMLElementSchema<'${schema.name}'> = schema.${className};

  readonly schema = ${className}.schema;

  attributes: ${attributesTypeName};
  contents: ${contentsTypeName};

  constructor(opts?: { attributes?: Partial<${attributesTypeName}>; contents?: ${contentsTypeName} }) {
    this.attributes = mergeAttributes(opts?.attributes || {}, ${className}.schema);
    this.contents = opts?.contents ?? operations.zero(${className}.schema.contents);
  }
${attributesAccessorMethodLiterals}
${contentsAccessorMethodLiterals}
}
registerElement('${className}', ${className});`;
};

const toMultiLineComment = (comment: string): string =>
	[
		'/**',
		...comment
			.replace(/\*\//g, '* /')
			.split('\n')
			.map((line) => `* ${line.trim()}`),
		'*/',
	].join('\n');

export const getTypeAssertMethodLiterals = (schema: XMLElementSchema): string[] => {
	const methods = new Set<string>();

	const addMethod = (typeName: string, validateChildLiteral: string) => {
		methods.add(
			`export const is${typeName} = (value: any): value is elements.${typeName} => { return operations.validate(value, elements.${validateChildLiteral}); }`,
		);
	};

	const join = (path: Array<string | number>): string => {
		const base = `${getClassName(schema)}`;
		return path.length === 0
			? base
			: `${base}.schema.contents${path.map((part) => (util.isString(part) ? propertyAccess(part) : `[${part}]`)).join('')}`;
	};

	const onChoice = (choice: DescriptorChild, path: Array<string | number>) => {
		if (util.isDescriptor(choice)) {
			switch (choice.type) {
				case 'label': {
					const typeName = getChoiceTypeName(choice);
					addMethod(typeName, join(path));
					break;
				}
				case 'required':
				case 'optional':
					onChoice(choice.value, [...path, 'value']);
					break;
			}
		}
		if (util.isXMLElementSchema(choice) && path.length === 0) {
			const className = getClassName(choice);
			addMethod(className, join(path));
		}
	};

	const dfs = (child: DescriptorChild, path: Array<string | number> = []) => {
		if (util.isDescriptor(child)) {
			switch (child.type) {
				case 'label':
				case 'optional':
				case 'required':
				case 'zeroOrMore':
				case 'oneOrMore':
					dfs(child.value, [...path, 'value']);
					break;
				case 'choices':
					child.choices.forEach((choice, ndx) => {
						onChoice(choice, [...path, 'choices', ndx]);
						dfs(choice, [...path, 'choices', ndx]);
					});
					break;
			}
		}
		if (util.isXMLElementSchema(child)) {
			const className = getClassName(child);
			addMethod(className, className);
		}
		if (util.isArray(child)) {
			for (let ndx = 0; ndx < child.length; ndx++) {
				dfs(child[ndx], [...path, ndx]);
			}
		}
	};

	dfs(schema);
	dfs(schema.contents);
	return Array.from(methods);
};

export const generateFiles = (
	roots: XMLElementSchema[],
	docs: Record<string, string>,
): { elements: string; asserts: string; schema: string } => {
	const elements: string[] = [];
	const seenElements = new Set<string>();
	const schemas: XMLElementSchema[] = [];
	elements.push(`import { XMLElement, XMLElementSchema } from '../lib/schema';`);
	elements.push(`import * as operations from '../lib/operations';`);
	elements.push(`import { schema, registerElement } from './schema';`);
	elements.push(`// Schema types are deliberately erased; the emitted Attributes types describe the result.
const mergeAttributes = operations.merge as unknown as (attributes: Record<string, any>, schema: XMLElementSchema) => any;`);

	const asserts: string[] = [];
	const assertLiterals = new Set<string>();
	asserts.push(`import * as elements from './elements';`);
	asserts.push(`import * as operations from '../lib/operations';`);

	// Dependencies must appear first in the file, which is why we're going through the trouble of traversing the
	// tree dfs in-order.
	const dfs = (child: DescriptorChild): void => {
		if (util.isDescriptor(child)) {
			switch (child.type) {
				case 'label':
				case 'optional':
				case 'required':
				case 'constant':
					dfs(child.value);
					return;
				case 'zeroOrMore':
				case 'oneOrMore':
					dfs(child.value);
					return;
				case 'choices':
					child.choices.forEach(dfs);
					return;
			}
		}
		if (util.isXMLElementSchema(child)) {
			dfs(child.contents);

			for (const assertLiteral of getTypeAssertMethodLiterals(child)) {
				assertLiterals.add(assertLiteral);
			}

			const className = getClassName(child);
			if (!seenElements.has(className)) {
				seenElements.add(className);
				schemas.push(child);
				elements.push(toClassLiteral(child, docs));
			}
		}
		if (util.isArray(child)) {
			child.forEach(dfs);
			return;
		}
	};

	roots.forEach(dfs);
	return {
		elements: elements.join('\n'),
		asserts: [...asserts, ...Array.from(assertLiterals).sort()].join('\n\n'),
		schema: toSchemaFile(schemas),
	};
};
