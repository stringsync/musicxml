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

const getClassName = (schema: XMLElementSchema): string => {
  return schema.className ? toPascalCase(schema.className) : toPascalCase(schema.name);
};

const getLabeledTypeLiterals = (schema: XMLElementSchema): string => {
  const literals = new Array<string>();

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

const getChoiceTypeName = (child: DescriptorChild): string => {
  if (util.isDescriptor(child) && child.type === 'label') {
    return toPascalCase(child.label);
  }
  return getTypeLiteral(child);
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
  const className = getClassName(schema);
  for (const [key, value] of Object.entries(schema.attributes)) {
    const name = getAttributeLabel(value) || key;
    const typeLiteral = getTypeLiteral(value);
    methods.push(`  get${toPascalCase(decolonize(name))}(): ${typeLiteral} { return this.attributes['${key}']; }`);
    methods.push(
      `  set${toPascalCase(decolonize(name))}(${toCamelCase(
        decolonize(name)
      )}: ${typeLiteral}): ${className} { this.attributes['${key}'] = ${toCamelCase(decolonize(name))}; return this; }`
    );
  }
  return methods.join('\n');
};

const getLiteral = (value: any): string => {
  if (value instanceof RegExp) {
    return value.toString();
  }
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
    return `[${value.map(getLiteral).join(', ')}]`;
  }
  if (util.isXMLElementSchema(value)) {
    return getClassName(value);
  }
  if (util.isFunction(value)) {
    return getLiteral(value());
  }
  if (util.isObject(value)) {
    return Object.keys(value).length > 0
      ? `{ ${Object.entries(value)
          .map(([k, v]) => `'${k}': ${getLiteral(v)}`)
          .join(', ')} }`
      : '{}';
  }
  throw new MusicXMLError({
    symptom: 'cannot compute literal',
    context: { value },
    remedy: 'use a different value',
  });
};

const getSchemaLiteral = (schema: XMLElementSchema): string => {
  const name = getLiteral(schema.name);
  const attributes = getLiteral(schema.attributes);
  const contents = getLiteral(schema.contents);
  return `{ name: ${name}, attributes: ${attributes}, contents: ${contents} }`;
};

const getStaticTypeAssertMethodLiterals = (schema: XMLElementSchema): string => {
  const methods = new Set<string>();

  const addMethod = (typeName: string, validateChildLiteral: string) => {
    methods.add(
      `  static is${typeName}(value: any): value is ${typeName} { return operations.validate(value, ${validateChildLiteral}); }`
    );
  };

  const join = (path: Array<string | number>): string => {
    return `${getClassName(schema)}.schema.contents${path
      .map((part) => (util.isString(part) ? `['${part}']` : `[${part}]`))
      .join('')}`;
  };

  const onChoice = (choice: DescriptorChild, path: Array<string | number>) => {
    if (util.isDescriptor(choice)) {
      switch (choice.type) {
        case 'label':
          const typeName = getChoiceTypeName(choice);
          addMethod(typeName, join(path));
          break;
        case 'required':
        case 'optional':
          onChoice(choice.value, [...path, 'value']);
          break;
      }
    }
    if (util.isXMLElementSchema(choice)) {
      const className = getClassName(choice);
      addMethod(className, className);
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
    if (util.isArray(child)) {
      child.forEach((c, ndx) => dfs(c, [...path, ndx]));
    }
  };

  dfs(schema.contents);
  return Array.from(methods).join('\n');
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

  const className = getClassName(schema);
  const methods = new Array<string>();
  for (let ndx = 0; ndx < contents.length; ndx++) {
    const accessorName = getAccessorName(contents[ndx]);
    methods.push(
      `  get${toPascalCase(accessorName)}(): ${getTypeLiteral(contents[ndx])} { return this.contents[${ndx}]; }`
    );
    methods.push(
      `  set${toPascalCase(accessorName)}(${toCamelCase(accessorName)}: ${getTypeLiteral(
        contents[ndx]
      )}): ${className} { this.contents[${ndx}] = ${toCamelCase(accessorName)}; return this; }`
    );
  }
  return methods.join('\n');
};

const toClassLiteral = (schema: XMLElementSchema): string => {
  const className = getClassName(schema);

  const schemaLiteral = getSchemaLiteral(schema);

  const staticTypeAssertMethodLiterals = getStaticTypeAssertMethodLiterals(schema);

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

export class ${className} implements XMLElement<'${schema.name}', ${attributesTypeName}, ${contentsTypeName}> {
  static readonly schema = ${schemaLiteral} as const;
${staticTypeAssertMethodLiterals}

  readonly schema = ${className}.schema;

  attributes: ${attributesTypeName};
  contents: ${contentsTypeName};

  constructor(opts?: { attributes?: Partial<${attributesTypeName}>; contents?: ${contentsTypeName} }) {
    this.attributes = operations.merge(opts?.attributes || {}, ${className}.schema);
    this.contents = opts?.contents ?? operations.zero(${className}.schema.contents);
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
  literals.push(`import * as operations from '../lib/operations';`);

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
      const className = getClassName(child);
      if (!seen.has(className)) {
        seen.add(className);
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
