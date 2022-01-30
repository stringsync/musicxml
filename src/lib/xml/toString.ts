import { MusicXMLError } from '../errors';
import * as helpers from './helpers';
import { isValid } from './isValid';
import { Child, Descriptor } from './types';
import { zero } from './zero';

export const toString = <T extends Extract<Child, string | number | Descriptor>>(value: any, child: T): string => {
  value = isValid(value, child) ? value : zero(child);

  if (helpers.isString(child)) {
    return value;
  }
  if (helpers.isNumber(child)) {
    return value;
  }
  if (helpers.isDescriptor(child)) {
    switch (child.type) {
      case 'string':
        return value;
      case 'regex':
        return value;
      case 'int':
        return Math.round(value).toString();
      case 'float':
        return value.toString();
      case 'constant':
        return String(value);
      case 'date':
        return value.toISOString();
      case 'choices':
        return String(value);
      case 'optional':
        return helpers.isNull(value) ? '' : String(value);
      case 'required':
        return String(value);
      case 'not':
        return String(value);
    }
  }
  throw new MusicXMLError({
    symptom: 'cannot encode string',
    context: { value, child },
    remedy: 'use a different child or value',
  });
};
