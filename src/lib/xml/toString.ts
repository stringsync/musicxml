import { MusicXMLError } from '../errors';
import { Descriptor, DescriptorChild } from '../schema';
import * as util from '../util';
import { isValid } from './isValid';
import { zero } from './zero';

export const toString = <T extends Extract<DescriptorChild, string | number | Descriptor>>(
  value: any,
  child: T
): string => {
  value = isValid(value, child) ? value : zero(child);

  if (util.isString(child)) {
    return value;
  }
  if (util.isNumber(child)) {
    return value;
  }
  if (util.isDescriptor(child)) {
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
        return util.isNull(value) ? '' : String(value);
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
