import { MusicXMLError } from '../errors';
import * as helpers from './helpers';
import { isValid } from './isValid';
import { toString } from './toString';
import { Child, RawXMLElement, XMLElement } from './types';
import { zero } from './zero';

export const toRawXMLElement = (element: XMLElement<any, any, any>): RawXMLElement => {
  const attributes: any = {};
  for (const key of Object.keys(element.attributes)) {
    attributes[key] = toString(element.attributes[key], element.schema.attributes[key]);
  }

  const children = new Array<RawXMLElement>();
  for (let ndx = 0; ndx < element.schema.content.length; ndx++) {
    const value = element.content[ndx];
    const child = element.schema.content[ndx];
    children.push(...resolve(value, child));
  }

  return { type: 'element', name: element.name, attributes, children };
};

const resolve = (value: any, child: Child): RawXMLElement[] => {
  if (helpers.isString(child)) {
    return [{ type: 'text', text: toString(value, child) }];
  }
  if (helpers.isNumber(child)) {
    return [{ type: 'text', text: toString(value, child) }];
  }
  if (helpers.isDescriptor(child)) {
    switch (child.type) {
      case 'string':
      case 'int':
      case 'float':
      case 'constant':
      case 'regex':
      case 'date':
        return [{ type: 'text', text: toString(value, child) }];
      case 'optional':
      case 'required':
        return resolve(value, child.value);
      case 'zeroOrMore':
      case 'oneOrMore':
        return (isValid(value, child) ? value : zero(child)).flatMap((v: any) => resolve(v, child.value));
      case 'choices':
        for (const choice of child.choices) {
          if (isValid(value, choice)) {
            return resolve(value, choice);
          }
        }
        return resolve(zero(child), child);
      case 'not':
        return resolve(isValid(value, child) ? value : zero(child), child.include);
    }
  }
  if (helpers.isXMLElement(value)) {
    return [toRawXMLElement(value)];
  }
  if (helpers.isArray(value)) {
    return value.flatMap(resolve);
  }
  throw new MusicXMLError({
    symptom: 'cannot convert to raw XML element',
    context: { value, child },
    remedy: 'use a different value or child',
  });
};
