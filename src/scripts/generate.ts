import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as elements from '../lib/elements';
import { MusicXMLError } from '../lib/errors';
import { Child, XMLElementFactory, XMLElementSchema } from '../lib/xml';
import * as helpers from '../lib/xml/helpers';

type AnyFactory = XMLElementFactory<string, XMLElementSchema<any, any>, Record<string, any>>;

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

const getClassName = (factory: AnyFactory): string => {
  return toPascalCase(factory.elementName);
};

const getTypeLiteral = (child: Child): string => {
  if (helpers.isString(child)) {
    return `'${child}'`;
  }
  if (helpers.isNumber(child)) {
    return child.toString();
  }
  if (helpers.isDescriptor(child)) {
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
  if (helpers.isXMLElementFactory(child)) {
    return getClassName(child);
  }
  if (helpers.isFunction(child)) {
    return getTypeLiteral(child());
  }
  if (helpers.isArray(child)) {
    return `[${child.map(getTypeLiteral).join(', ')}]`;
  }
  throw new MusicXMLError({
    symptom: 'cannot compute type for value',
    context: { child },
    remedy: 'update getType or use a different child',
  });
};

const getZeroValueLiteral = (child: Child): string => {
  if (helpers.isString(child)) {
    return `'${child}'`;
  }
  if (helpers.isNumber(child)) {
    return child.toString();
  }
  if (helpers.isDescriptor(child)) {
    switch (child.type) {
      case 'string':
        return `''`;
      case 'regex':
        return `'${child.zero}'`;
      case 'int':
      case 'float':
        return '0';
      case 'date':
        return 'new Date(1970, 0, 1, 0, 0, 0, 0)';
      case 'constant':
        return `${getZeroValueLiteral(child.value)}`;
      case 'choices':
        return getZeroValueLiteral(child.choices[0]);
      case 'optional':
        return 'null';
      case 'required':
      case 'label':
        return getZeroValueLiteral(child.value);
      case 'zeroOrMore':
        return '[]';
      case 'oneOrMore':
        return `[${getZeroValueLiteral(child.value)}]`;
      case 'not':
        return getZeroValueLiteral(child.include);
    }
  }
  if (helpers.isXMLElementFactory(child)) {
    return `new ${getClassName(child)}()`;
  }
  if (helpers.isFunction(child)) {
    return getZeroValueLiteral(child());
  }
  if (helpers.isArray(child)) {
    return `[${child.map(getZeroValueLiteral).join(', ')}]`;
  }
  throw new MusicXMLError({
    symptom: 'cannot compute zero value literal',
    context: { child },
    remedy: 'use a different child or update getZeroValueLiteral',
  });
};

const getAttributesTypeLiteral = (factory: AnyFactory): string => {
  const attributes = new Array<string>();
  for (const [key, value] of Object.entries(factory.schema.attributes)) {
    attributes.push(`'${key}': ${getTypeLiteral(value as Child)}`);
  }
  return attributes.length > 0 ? `{ ${attributes.join(', ')} }` : 'Record<string, unknown>';
};

const getAttributesZeroValueLiteral = (factory: AnyFactory): string => {
  const attributes = new Array<string>();
  for (const [key, value] of Object.entries(factory.schema.attributes)) {
    attributes.push(`['${key}']: ${getZeroValueLiteral(value as Child)}`);
  }
  return attributes.length > 0 ? `{ ${attributes.join(', ')} }` : '{}';
};

const getContentsTypeLiteral = (factory: AnyFactory): string => {
  const contents = new Array<string>();
  for (const content of factory.schema.content) {
    contents.push(getTypeLiteral(content));
  }
  return `[${contents.join(', ')}]`;
};

const getContentsZeroValueLiteral = (factory: AnyFactory): string => {
  const contents = new Array<string>();
  for (const content of factory.schema.content) {
    contents.push(getZeroValueLiteral(content));
  }
  return `[${contents.join(', ')}]`;
};

const getAttributeLabel = (child: Child): string => {
  if (helpers.isDescriptor(child)) {
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

const getAttributeAccessorMethodLiterals = (factory: AnyFactory): string => {
  const methods = new Array<string>();
  for (const [key, value] of Object.entries(factory.schema.attributes)) {
    const name = getAttributeLabel(value as Child) || key;
    const typeLiteral = getTypeLiteral(value as Child);
    methods.push(`  get${toPascalCase(decolonize(name))}(): ${typeLiteral} { return this.attributes['${key}']; }`);
    methods.push(
      `  set${toPascalCase(decolonize(name))}(${toCamelCase(
        decolonize(name)
      )}: ${typeLiteral}): void { this.attributes['${key}'] = ${toCamelCase(decolonize(name))}; }`
    );
  }
  return methods.join('\n');
};

const getSchemaLiteral = (factory: AnyFactory): string => {
  const dfs = (value: any): string => {
    if (helpers.isString(value)) {
      return `'${value}'`;
    }
    if (helpers.isNumber(value)) {
      return value.toString();
    }
    if (helpers.isNull(value)) {
      return 'null';
    }
    if (helpers.isArray(value)) {
      return `[${value.map(dfs).join(', ')}]`;
    }
    if (helpers.isXMLElementFactory(value)) {
      return toPascalCase(value.elementName);
    }
    if (helpers.isFunction(value)) {
      return dfs(value());
    }
    if (helpers.isObject(value)) {
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
  return dfs(factory.schema);
};

const getContentsAccessorMethodLiterals = (factory: AnyFactory): string => {
  const contents = factory.schema.content;

  const hasTextNode = (child: Child): boolean => {
    if (helpers.isDescriptor(child)) {
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

  const getAccessorName = (child: Child): string => {
    if (helpers.isDescriptor(child)) {
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
    if (helpers.isXMLElementFactory(child)) {
      return child.elementName;
    }
    throw new MusicXMLError({
      symptom: 'cannot compute content accessor name',
      context: { child, elementName: factory.elementName },
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
      context: { numTextNodes, factory },
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

const toClassLiteral = (factory: AnyFactory): string => {
  const className = getClassName(factory);

  const schemaLiteral = getSchemaLiteral(factory);

  const attributesTypeName = `${className}Attributes`;
  const attributesTypeLiteral = getAttributesTypeLiteral(factory);
  const attributesZeroValueLiteral = getAttributesZeroValueLiteral(factory);
  const attributesAccessorMethodLiterals = getAttributeAccessorMethodLiterals(factory);

  const contentsTypeName = `${className}Contents`;
  const contentsTypeLiteral = getContentsTypeLiteral(factory);
  const contentsZeroValueLiteral = getContentsZeroValueLiteral(factory);
  const contentsAccessorMethodLiterals = getContentsAccessorMethodLiterals(factory);

  return `
export type ${attributesTypeName} = ${attributesTypeLiteral};

export type ${contentsTypeName} = ${contentsTypeLiteral};

export class ${className} implements XMLElement<${attributesTypeName}, ${contentsTypeName}> {
  static readonly elementName = '${factory.elementName}';
  static readonly schema = ${schemaLiteral};

  attributes: ${attributesTypeName};
  contents: ${contentsTypeName};

  constructor(opts?: { attributes?: Partial<${attributesTypeName}>; content?: ${contentsTypeName} }) {
    this.attributes = Object.assign(${attributesZeroValueLiteral}, opts?.attributes);
    this.contents = opts?.content ?? ${contentsZeroValueLiteral};
  }
${attributesAccessorMethodLiterals}
${contentsAccessorMethodLiterals}
}`;
};

const getXmlElementInterfaceLiteral = (): string => {
  return `
export interface XMLElement<A extends Record<string, any>, C extends any[]> {
  attributes: A;
  contents: C;
}`;
};

const generateFileContents = (roots: AnyFactory[]): string => {
  const literals = new Array<string>();
  const seen = new Set<string>();

  literals.push('/* eslint-disable @typescript-eslint/ban-types */');
  literals.push(getXmlElementInterfaceLiteral());

  // Dependencies must appear first in the file, which is why we're going through the trouble of traversing the
  // tree dfs in-order.
  const dfs = (child: Child): void => {
    if (helpers.isDescriptor(child)) {
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
    if (helpers.isXMLElementFactory(child)) {
      dfs(child.schema.content);
      if (!seen.has(child.elementName)) {
        seen.add(child.elementName);
        literals.push(toClassLiteral(child));
      }
    }
    if (helpers.isArray(child)) {
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
