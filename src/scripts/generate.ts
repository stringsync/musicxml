import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import * as elements from '../lib/elements';
import { DescriptorChild, XMLElementSchema } from '../lib/schema';
import * as util from '../lib/util';
import { MusicXMLError } from '../MusicXMLError';

const OUTPUT_DIRECTORY = path.join(__dirname, '..', 'generated');
const ELEMENTS_OUTPUT_PATH = path.join(OUTPUT_DIRECTORY, 'elements.ts');
const ASSERTS_OUTPUT_PATH = path.join(OUTPUT_DIRECTORY, 'asserts.ts');

const ELEMENTS_INPUT_DIRECTORY = path.join(__dirname, '..', 'lib', 'elements');

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
  throw new MusicXMLError('cannot compute type for value', { child });
};

const getAttributesTypeLiteral = (schema: XMLElementSchema, comments: Record<string, string>): string => {
  const attributes = new Array<string>();
  for (const [key, value] of Object.entries(schema.attributes)) {
    const declaration = `'${key}': ${getTypeLiteral(value as DescriptorChild)}`;

    if (key in comments) {
      attributes.push([toMultiLineComment(comments[key]), declaration].join('\n'));
    } else {
      attributes.push(declaration);
    }
  }
  return attributes.length > 0 ? `{ ${attributes.join(';\n')} }` : 'Record<string, unknown>';
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
    methods.push(`/** Gets @type {${className}Attributes['${name}']}. */`);
    methods.push(`get${toPascalCase(decolonize(name))}(): ${typeLiteral} { return this.attributes['${key}']; }`);
    methods.push(`/** Sets @type {${className}Attributes['${name}']}. */`);
    methods.push(
      `set${toPascalCase(decolonize(name))}(${toCamelCase(
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
  throw new MusicXMLError('cannot compute literal', { value });
};

const getSchemaLiteral = (schema: XMLElementSchema): string => {
  const name = getLiteral(schema.name);
  const attributes = getLiteral(schema.attributes);
  const contents = getLiteral(schema.contents);
  return `{ name: ${name}, attributes: ${attributes}, contents: ${contents} }`;
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

  const methods = new Array<string>();
  for (let ndx = 0; ndx < contents.length; ndx++) {
    const accessorName = getAccessorName(contents[ndx]);
    methods.push(`/** Gets @type {${getTypeLiteral(contents[ndx])}}. */`);
    methods.push(
      `get${toPascalCase(accessorName)}(): ${getTypeLiteral(contents[ndx])} { return this.contents[${ndx}]; }`
    );
    methods.push(`/** Sets @type {${getTypeLiteral(contents[ndx])}}. */`);
    methods.push(
      `set${toPascalCase(accessorName)}(${toCamelCase(accessorName)}: ${getTypeLiteral(
        contents[ndx]
      )}): this { this.contents[${ndx}] = ${toCamelCase(accessorName)}; return this; }`
    );
  }
  return methods.join('\n');
};

const toClassLiteral = (schema: XMLElementSchema): string => {
  const className = getClassName(schema);
  const comments = getElementComments(className);
  const classComment = toMultiLineComment(comments.leading);

  const schemaLiteral = getSchemaLiteral(schema);

  const labeledTypeLiterals = getLabeledTypeLiterals(schema);

  const attributesTypeName = `${className}Attributes`;
  const attributesTypeLiteral = getAttributesTypeLiteral(schema, comments.attributes);
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
  static readonly schema = ${schemaLiteral} as const;

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

const getElementComments = (className: string): { leading: string; attributes: Record<string, string> } => {
  const comments: { leading: string; attributes: Record<string, string> } = { leading: '', attributes: {} };

  const sourceFilePath = path.join(ELEMENTS_INPUT_DIRECTORY, `${className}.ts`);
  const sourceFile = ts.createSourceFile(
    sourceFilePath,
    fs.readFileSync(sourceFilePath).toString(),
    ts.ScriptTarget.Latest,
    true
  );

  function extract(node: ts.Node, sourceFile: ts.SourceFile): string {
    const comments = new Array<string>();

    // Collect leading comments
    const leadingComments = ts.getLeadingCommentRanges(sourceFile.text, node.getFullStart());
    if (leadingComments) {
      leadingComments.forEach((commentRange) => {
        comments.push(sourceFile.text.substring(commentRange.pos, commentRange.end));
      });
    }

    return comments
      .join('\n')
      .replace(/\/\*\*|\*\/|\*/g, '')
      .trim();
  }

  ts.forEachChild(sourceFile, (node) => {
    if (!ts.isVariableStatement(node)) {
      return;
    }
    // Extract the leading comment.
    comments.leading = extract(node, sourceFile);

    // When a schema is being defined, extract the comments from the attributes argument (should be second).
    const declaration = node.declarationList.declarations[0];
    if (!ts.isVariableDeclaration(declaration)) {
      return;
    }

    declaration.forEachChild((child) => {
      if (!ts.isCallExpression(child)) {
        return;
      }
      if (!ts.isIdentifier(child.expression)) {
        return;
      }
      if (child.expression.text !== 'schema') {
        return;
      }
      const args = child.arguments;
      // Ensure there is a second argument and it's an object literal
      if (args.length > 1 && ts.isObjectLiteralExpression(args[1])) {
        const properties = args[1] as ts.ObjectLiteralExpression;
        properties.properties.forEach((property) => {
          if (ts.isPropertyAssignment(property)) {
            // remove brackets and apostrophes
            const propertyName = property.name.getText(sourceFile).replace(/[[\]']/g, '');
            comments.attributes[propertyName] = extract(property, sourceFile);
          }
        });
      }
    });
  });

  return comments;
};

const toMultiLineComment = (comment: string): string =>
  ['/**', ...comment.split('\n').map((line) => `* ${line.trim()}`), '*/'].join('\n');

const getTypeAssertMethodLiterals = (schema: XMLElementSchema): string[] => {
  const methods = new Set<string>();

  const addMethod = (typeName: string, validateChildLiteral: string) => {
    methods.add(
      `export const is${typeName} = (value: any): value is elements.${typeName} => { return operations.validate(value, elements.${validateChildLiteral}); }`
    );
  };

  const join = (path: Array<string | number>): string => {
    const base = `${getClassName(schema)}`;
    return path.length === 0
      ? base
      : base + `.schema.contents${path.map((part) => (util.isString(part) ? `['${part}']` : `[${part}]`)).join('')}`;
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
      child.forEach((c, ndx) => dfs(c, [...path, ndx]));
    }
  };

  dfs(schema);
  dfs(schema.contents);
  return Array.from(methods);
};

const generateFiles = (roots: XMLElementSchema[]): { elements: string; asserts: string } => {
  const elements = new Array<string>();
  const seenElements = new Set<string>();
  elements.push('/* eslint-disable @typescript-eslint/ban-types */');
  elements.push(`import { XMLElement, XMLElementSchema } from '../lib/schema';`);
  elements.push(`import * as operations from '../lib/operations';`);

  const asserts = new Array<string>();
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

      for (const assertLiteral of getTypeAssertMethodLiterals(child)) {
        assertLiterals.add(assertLiteral);
      }

      const className = getClassName(child);
      if (!seenElements.has(className)) {
        seenElements.add(className);
        elements.push(toClassLiteral(child));
      }
    }
    if (util.isArray(child)) {
      return child.forEach(dfs);
    }
  };

  roots.forEach(dfs);
  return { elements: elements.join('\n'), asserts: [...asserts, ...Array.from(assertLiterals).sort()].join('\n\n') };
};

(async () => {
  process.stdout.write('generating files');
  const files = generateFiles([elements.ScorePartwise, elements.ScoreTimewise]);
  process.stdout.write(' ✅\n');

  process.stdout.write(`writing ${ELEMENTS_OUTPUT_PATH}`);
  fs.writeFileSync(ELEMENTS_OUTPUT_PATH, files.elements);
  process.stdout.write(' ✅\n');

  process.stdout.write(`writing ${ASSERTS_OUTPUT_PATH}`);
  fs.writeFileSync(ASSERTS_OUTPUT_PATH, files.asserts);
  process.stdout.write(' ✅\n');

  process.stdout.write('running eslint');
  await new Promise((resolve) => exec(`yarn eslint --fix ${OUTPUT_DIRECTORY}`, resolve));
  process.stdout.write(' ✅\n');

  process.stdout.write('running prettier');
  await new Promise((resolve) => exec(`yarn prettier --write ${OUTPUT_DIRECTORY}`, resolve));
  process.stdout.write(' ✅\n');
})();
