import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as elements from '../lib/elements';
import { MusicXMLError } from '../lib/errors';
import { DescriptorChild, XMLElementSchema } from '../lib/schema';
import * as util from '../lib/util';

const OUTPUT_PATH = path.join(__dirname, '..', 'generated', 'elements.ts');

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

const getClassName = (factory: XMLElementSchema): string => {
  return toPascalCase(factory.name);
};

const getTypeLiteral = (child: DescriptorChild): string => {
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
        return child.choices.map(getTypeLiteral).join(' | ');
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
  throw new MusicXMLError({
    symptom: 'cannot compute type for value',
    context: { child },
    remedy: 'update getType or use a different child',
  });
};

const getAttributesTypeLiteral = (schema: XMLElementSchema): string => {
  const attributes = new Array<string>();
  for (const [key, value] of Object.entries(schema.attributes)) {
    attributes.push(`'${key}': ${getTypeLiteral(value as DescriptorChild)}`);
  }
  return attributes.length > 0 ? `{ ${attributes.join(', ')} }` : 'Record<string, unknown>';
};

const getContentsTypeLiteral = (schema: XMLElementSchema): string => {
  const contents = new Array<string>();
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

const getAttributeAccessorMethodLiterals = (schema: XMLElementSchema): string => {
  const methods = new Array<string>();
  for (const [key, value] of Object.entries(schema.attributes)) {
    const name = getAttributeLabel(value) || key;
    const typeLiteral = getTypeLiteral(value);
    methods.push(`  get${toPascalCase(decolonize(name))}(): ${typeLiteral} { return this.attributes['${key}']; }`);
    methods.push(
      `  set${toPascalCase(decolonize(name))}(${toCamelCase(
        decolonize(name)
      )}: ${typeLiteral}): void { this.attributes['${key}'] = ${toCamelCase(decolonize(name))}; }`
    );
  }
  return methods.join('\n');
};

const getSchemaLiteral = (schema: XMLElementSchema): string => {
  const dfs = (value: any): string => {
    if (util.isString(value)) {
      return `'${value}'`;
    }
    if (util.isNumber(value)) {
      return value.toString();
    }
    if (util.isNull(value)) {
      return 'null';
    }
    if (util.isArray(value)) {
      return `[${value.map(dfs).join(', ')}]`;
    }
    if (util.isXMLElementSchema(value)) {
      return toPascalCase(value.name);
    }
    if (util.isFunction(value)) {
      return dfs(value());
    }
    if (util.isObject(value)) {
      return Object.keys(value).length > 0
        ? `{ ${Object.entries(value)
            .map(([k, v]) => `'${k}': ${dfs(v)}`)
            .join(', ')} }`
        : '{}';
    }
    throw new MusicXMLError({
      symptom: 'cannot compute schema literal',
      context: { value },
      remedy: 'use a different value or update getSchemaLiteral',
    });
  };
  return `{ name: ${dfs(schema.name)}, attributes: ${dfs(schema.attributes)}, contents: ${dfs(schema.contents)} }`;
};

const getContentsAccessorMethodLiterals = (schema: XMLElementSchema): string => {
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
    throw new MusicXMLError({
      symptom: 'cannot compute content accessor name',
      context: { child, elementName: schema.name },
      remedy: 'add a label, or make sure the leaf child is a factory',
    });
  };

  let numTextNodes = 0;
  for (const content of contents) {
    if (hasTextNode(content)) {
      numTextNodes++;
    }
  }
  if (numTextNodes > 1) {
    throw new MusicXMLError({
      symptom: 'too many text nodes',
      context: { numTextNodes, factory: schema },
      remedy: 'use labels for all text nodes',
    });
  }

  const methods = new Array<string>();
  for (let ndx = 0; ndx < contents.length; ndx++) {
    const accessorName = getAccessorName(contents[ndx]);
    methods.push(
      `  get${toPascalCase(accessorName)}(): ${getTypeLiteral(contents[ndx])} { return this.contents[${ndx}]; }`
    );
    methods.push(
      `  set${toPascalCase(accessorName)}(${toCamelCase(accessorName)}: ${getTypeLiteral(
        contents[ndx]
      )}): void { this.contents[${ndx}] = ${toCamelCase(accessorName)}; }`
    );
  }
  return methods.join('\n');
};

const toClassLiteral = (schema: XMLElementSchema): string => {
  const className = getClassName(schema);

  const schemaLiteral = getSchemaLiteral(schema);

  const attributesTypeName = `${className}Attributes`;
  const attributesTypeLiteral = getAttributesTypeLiteral(schema);
  const attributesAccessorMethodLiterals = getAttributeAccessorMethodLiterals(schema);

  const contentsTypeName = `${className}Contents`;
  const contentsTypeLiteral = getContentsTypeLiteral(schema);
  const contentsAccessorMethodLiterals = getContentsAccessorMethodLiterals(schema);

  return `
export type ${attributesTypeName} = ${attributesTypeLiteral};

export type ${contentsTypeName} = ${contentsTypeLiteral};

export class ${className} implements XMLElement<'${schema.name}', ${attributesTypeName}, ${contentsTypeName}> {
  static readonly schema = ${schemaLiteral} as const;

  readonly schema = ${className}.schema;

  attributes: ${attributesTypeName};
  contents: ${contentsTypeName};

  constructor(opts?: { attributes?: Partial<${attributesTypeName}>; content?: ${contentsTypeName} }) {
    this.attributes = xml.mergeZero(opts?.attributes, ${className}.schema);
    this.contents = opts?.content ?? xml.zero(${className}.schema.contents);
  }
${attributesAccessorMethodLiterals}
${contentsAccessorMethodLiterals}
}`;
};

const generateFileContents = (roots: XMLElementSchema[]): string => {
  const literals = new Array<string>();
  const seen = new Set<string>();

  literals.push('/* eslint-disable @typescript-eslint/ban-types */');
  literals.push(`import { XMLElement, XMLElementSchema } from '../lib/schema';`);
  literals.push(`import * as xml from '../lib/xml`);

  // Dependencies must appear first in the file, which is why we're going through the trouble of traversing the
  // tree dfs in-order.
  const dfs = (child: DescriptorChild): void => {
    if (util.isDescriptor(child)) {
      switch (child.type) {
        case 'label':
        case 'optional':
        case 'required':
        case 'constant':
          return dfs(child.value);
        case 'zeroOrMore':
        case 'oneOrMore':
          return dfs(child.value);
        case 'choices':
          return child.choices.forEach(dfs);
      }
    }
    if (util.isXMLElementSchema(child)) {
      dfs(child.contents);
      if (!seen.has(child.name)) {
        seen.add(child.name);
        literals.push(toClassLiteral(child));
      }
    }
    if (util.isArray(child)) {
      return child.forEach(dfs);
    }
  };

  roots.forEach(dfs);

  return literals.join('\n');
};

(async () => {
  process.stdout.write('generating elements');
  const generatedFileContents = generateFileContents([elements.ScorePartwise, elements.ScoreTimewise]);
  process.stdout.write(' ✅\n');

  process.stdout.write(`writing ${OUTPUT_PATH}`);
  fs.writeFileSync(OUTPUT_PATH, generatedFileContents);
  process.stdout.write(' ✅\n');

  process.stdout.write('running eslint');
  await new Promise((resolve) => exec(`yarn eslint --fix ${OUTPUT_PATH}`, resolve));
  process.stdout.write(' ✅\n');

  process.stdout.write('running prettier');
  await new Promise((resolve) => exec(`yarn prettier --write ${OUTPUT_PATH}`, resolve));
  process.stdout.write(' ✅\n');
})();
