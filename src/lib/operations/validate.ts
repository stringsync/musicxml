import { MusicXMLError } from '../errors';
import { DescriptorChild } from '../schema/types';
import * as util from '../util';

/**
 * Validates if a value is compatible with a descriptor child.
 *
 * @param value any value to test
 * @param child a descriptor child to validate against
 * @returns {boolean}
 */
export const validate = (value: any, child: DescriptorChild): boolean => {
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
        return Number.isInteger(value) && !isNaN(value) && child.min <= value && value <= child.max;
      case 'float':
        return util.isNumber(value) && !isNaN(value) && child.min <= value && value <= child.max;
      case 'constant':
        return value === child.value;
      case 'date':
        return value instanceof Date;
      case 'choices':
        return child.choices.some((choice) => validate(value, choice));
      case 'label':
        return validate(value, child.value);
      case 'optional':
        return util.isNull(value) || validate(value, child.value);
      case 'required':
        return validate(value, child.value);
      case 'zeroOrMore':
        return util.isArray(value) && value.every((v) => validate(v, child.value));
      case 'oneOrMore':
        return util.isArray(value) && value.length >= 1 && value.every((v) => validate(v, child.value));
      case 'not':
        return validate(value, child.include) && !validate(value, child.exclude);
    }
  }
  if (util.isXMLElementSchema(child)) {
    if (!util.isXMLElement(value)) {
      return false;
    }
    if (value.schema.name !== child.name) {
      return false;
    }
    return validate(value.contents, child.contents);
  }
  if (util.isXMLElementCtor(child)) {
    return validate(value, child.schema);
  }
  if (util.isFunction(child)) {
    return validate(value, child());
  }
  if (util.isArray(child)) {
    return Array.isArray(value) && value.length === child.length && child.every((c, ndx) => validate(value[ndx], c));
  }
  throw new MusicXMLError('cannot validate', { value, child });
};
