import { MusicXMLError } from '../errors';
import { DescriptorChild } from '../schema/types';
import * as util from '../util';

export const isValid = (value: any, child: DescriptorChild): boolean => {
  if (util.isString(child)) {
    return value === child;
  }
  if (util.isNumber(child)) {
    return value === child;
  }
  if (util.isDescriptor(child)) {
    switch (child.type) {
      case 'string':
        return util.isString(value);
      case 'regex':
        return util.isString(value) && !!value.match(child.pattern);
      case 'int':
        return Number.isInteger(value);
      case 'float':
        return util.isNumber(value) && !isNaN(value);
      case 'constant':
        return value === child.value;
      case 'date':
        return value instanceof Date;
      case 'choices':
        return child.choices.some((choice) => isValid(value, choice));
      case 'label':
        return isValid(value, child.value);
      case 'optional':
        return util.isNull(value) || isValid(value, child.value);
      case 'required':
        return isValid(value, child.value);
      case 'zeroOrMore':
        return util.isArray(value) && value.every((v) => isValid(v, child.value));
      case 'oneOrMore':
        return util.isArray(value) && value.length >= 1 && value.every((v) => isValid(v, child.value));
      case 'not':
        return isValid(value, child.include) && !isValid(value, child.exclude);
    }
  }
  if (util.isXMLElementSchema(child)) {
    if (!util.isXMLElement(value)) {
      return false;
    }
    if (value.schema.name !== child.name) {
      return false;
    }
    return isValid(value.contents, child.contents);
  }
  if (util.isXMLElementCtor(child)) {
    return isValid(value, child.schema);
  }
  if (util.isFunction(child)) {
    return isValid(value, child());
  }
  if (util.isArray(child)) {
    return Array.isArray(value) && value.length === child.length && child.every((c, ndx) => isValid(value[ndx], c));
  }
  throw new MusicXMLError({
    symptom: 'cannot compute validity',
    context: { value, child },
    remedy: 'use a different child or update isValid',
  });
};
