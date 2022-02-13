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
    const resolution = toString(element.attributes[key], element.schema.attributes[key]);
    if (resolution.type !== 'none') {
      attributes[key] = resolution.value;
    }
  }

  const children = resolve(element.contents, element.schema.contents);

  return { type: 'element', name: element.schema.name, attributes, children };
};

const resolve = (value: any, child: DescriptorChild): RawXMLElement[] => {
  if (util.isString(child)) {
    const resolution = toString(value, child);
    return resolution.type === 'none' ? [] : [{ type: 'text', text: resolution.value }];
  }
  if (util.isNumber(child)) {
    const resolution = toString(value, child);
    return resolution.type === 'none' ? [] : [{ type: 'text', text: resolution.value }];
  }
  if (util.isDescriptor(child)) {
    switch (child.type) {
      case 'string':
      case 'int':
      case 'float':
      case 'constant':
      case 'regex':
      case 'date':
        const resolution = toString(value, child);
        return resolution.type === 'none' ? [] : [{ type: 'text', text: resolution.value }];
      case 'optional':
        return util.isNull(value) ? [] : resolve(value, child.value);
      case 'required':
      case 'label':
        return resolve(value, child.value);
      case 'zeroOrMore':
      case 'oneOrMore':
        return isValid(value, child)
          ? value.flatMap((v: any) => resolve(v, child.value))
          : zero(child).flatMap((v: any) => resolve(v, child.value));
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
  if (util.isXMLElementCtor(child)) {
    return isValid(value, child) ? [toRawXMLElement(value)] : [toRawXMLElement(zero(child))];
  }
  if (util.isArray(child)) {
    return isValid(value, child)
      ? value.flatMap((v: any, ndx: number) => resolve(v, child[ndx]))
      : zero(child).flatMap((v: any, ndx: number) => resolve(v, child[ndx]));
  }
  throw new MusicXMLError({
    symptom: 'cannot convert to raw XML element',
    context: { value, child },
    remedy: 'use a different value or child',
  });
};
