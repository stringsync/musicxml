import { MusicXMLError } from '../errors';
import { DescriptorChild, XMLElement } from '../schema';
import * as util from '../util';
import { isValid } from './isValid';
import { toString } from './toString';
import { RawXMLElement } from './types';
import { zero } from './zero';

export const toRawXMLElement = (element: XMLElement): RawXMLElement => {
  const attributes: any = {};
  for (const key of Object.keys(element.attributes)) {
    attributes[key] = toString(element.attributes[key], element.schema.attributes[key]);
  }

  const children = new Array<RawXMLElement>();
  for (let ndx = 0; ndx < element.schema.contents.length; ndx++) {
    const value = element.contents[ndx];
    const child = element.schema.contents[ndx];
    children.push(...resolve(value, child));
  }

  return { type: 'element', name: element.schema.name, attributes, children };
};

const resolve = (value: any, child: DescriptorChild): RawXMLElement[] => {
  if (util.isString(child)) {
    return [{ type: 'text', text: toString(value, child) }];
  }
  if (util.isNumber(child)) {
    return [{ type: 'text', text: toString(value, child) }];
  }
  if (util.isDescriptor(child)) {
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
  if (util.isXMLElement(value)) {
    return [toRawXMLElement(value)];
  }
  if (util.isArray(value)) {
    return value.flatMap(resolve);
  }
  throw new MusicXMLError({
    symptom: 'cannot convert to raw XML element',
    context: { value, child },
    remedy: 'use a different value or child',
  });
};
