import { MusicXMLError } from '../errors';
import * as helpers from './helpers';
import { Child } from './types';

export const isValid = (value: any, child: Child): boolean => {
  if (helpers.isString(child)) {
    return value === child;
  }
  if (helpers.isNumber(child)) {
    return value === child;
  }
  if (helpers.isDescriptor(child)) {
    switch (child.type) {
      case 'string':
        return helpers.isString(value);
      case 'regex':
        return helpers.isString(value) && !!value.match(child.pattern);
      case 'int':
        return Number.isInteger(value);
      case 'float':
        return helpers.isNumber(value) && !isNaN(value);
      case 'constant':
        return value === child.value;
      case 'date':
        return value instanceof Date;
      case 'choices':
        return child.choices.some((choice) => isValid(value, choice));
      case 'optional':
        return helpers.isNull(value) || isValid(value, child.value);
      case 'required':
        return isValid(value, child.value);
      case 'zeroOrMore':
        return helpers.isArray(value) && value.every((v) => isValid(v, child.value));
      case 'oneOrMore':
        return helpers.isArray(value) && value.length >= 1 && value.every((v) => isValid(v, child.value));
      case 'not':
        return isValid(value, child.include) && !isValid(value, child.exclude);
    }
  }
  if (helpers.isXMLElementFactory(child)) {
    if (!helpers.isXMLElement(value)) {
      return false;
    }
    if (value.name !== child.elementName) {
      return false;
    }
    if (Object.keys(value.attributes).some((key) => !isValid(value.attributes[key], child.schema.attributes[key]))) {
      return false;
    }
    return isValid(value.content, child.schema.content);
  }
  if (helpers.isFunction(child)) {
    return isValid(value, child());
  }
  if (helpers.isArray(child)) {
    return Array.isArray(value) && value.length === child.length && child.every((c, ndx) => isValid(value[ndx], c));
  }
  throw new MusicXMLError({
    symptom: 'cannot compute validity',
    context: { child },
    remedy: 'use a different child or update isValid',
  });
};
