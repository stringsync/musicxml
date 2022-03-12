import { MusicXMLError } from '../errors';
import * as operations from '../operations';
import * as primitives from '../primitives';
import * as raw from '../raw';
import { DescriptorChild, XMLElement } from '../schema';
import * as util from '../util';

export const serialize = (element: XMLElement): raw.XmlNode => {
  const attributes: any = {};
  for (const key of Object.keys(element.attributes)) {
    const resolution = primitives.serialize(element.attributes[key], element.schema.attributes[key]);
    if (resolution.type !== 'none') {
      attributes[key] = resolution.value;
    }
  }

  const children = resolve(element.contents, element.schema.contents);

  return { type: 'element', name: element.schema.name, attributes, children };
};

const resolve = (value: any, child: DescriptorChild): raw.XmlNode[] => {
  if (util.isString(child)) {
    const resolution = primitives.serialize(value, child);
    return resolution.type === 'none' ? [] : [{ type: 'text', text: resolution.value }];
  }
  if (util.isNumber(child)) {
    const resolution = primitives.serialize(value, child);
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
        const resolution = primitives.serialize(value, child);
        return resolution.type === 'none' ? [] : [{ type: 'text', text: resolution.value }];
      case 'optional':
        return util.isNull(value) ? [] : resolve(value, child.value);
      case 'required':
      case 'label':
        return resolve(value, child.value);
      case 'zeroOrMore':
      case 'oneOrMore':
        return operations.validate(value, child)
          ? value.flatMap((v: any) => resolve(v, child.value))
          : operations.zero(child).flatMap((v: any) => resolve(v, child.value));
      case 'choices':
        for (const choice of child.choices) {
          if (operations.validate(value, choice)) {
            return resolve(value, choice);
          }
        }
        return resolve(operations.zero(child), child);
      case 'not':
        return resolve(operations.validate(value, child) ? value : operations.zero(child), child.include);
    }
  }
  if (util.isXMLElementCtor(child)) {
    return operations.validate(value, child) ? [serialize(value)] : [serialize(operations.zero(child))];
  }
  if (util.isArray(child)) {
    return operations.validate(value, child)
      ? value.flatMap((v: any, ndx: number) => resolve(v, child[ndx]))
      : operations.zero(child).flatMap((v: any, ndx: number) => resolve(v, child[ndx]));
  }
  throw new MusicXMLError({
    symptom: 'cannot convert to raw XML element',
    context: { value, child },
    remedy: 'use a different value or child',
  });
};
