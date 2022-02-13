import { MusicXMLError } from '../errors';
import { Descriptor, DescriptorChild } from '../schema';
import * as util from '../util';
import { isValid } from './isValid';
import { Resolution } from './types';
import { zero } from './zero';

export const toString = <T extends Extract<DescriptorChild, string | number | Descriptor>>(
  value: any,
  child: T
): Resolution<string> => {
  value = isValid(value, child) ? value : zero(child);

  if (util.isString(child)) {
    return { type: 'resolved', value };
  }
  if (util.isNumber(child)) {
    return { type: 'resolved', value: value.toString() };
  }
  if (util.isDescriptor(child)) {
    switch (child.type) {
      case 'string':
        return { type: 'resolved', value };
      case 'regex':
        return { type: 'resolved', value };
      case 'int':
        return { type: 'resolved', value: Math.round(value).toString() };
      case 'float':
        return { type: 'resolved', value: value.toString() };
      case 'constant':
        return { type: 'resolved', value: String(value) };
      case 'date':
        return { type: 'resolved', value: value.toISOString() };
      case 'choices':
        return { type: 'resolved', value: String(value) };
      case 'label':
        return toString(value, child.value);
      case 'optional':
        return util.isNull(value) ? { type: 'none', value: undefined } : { type: 'resolved', value: String(value) };
      case 'required':
        return { type: 'resolved', value: String(value) };
      case 'not':
        return { type: 'resolved', value: String(value) };
    }
  }
  throw new MusicXMLError({
    symptom: 'cannot encode string',
    context: { value, child },
    remedy: 'use a different child or value',
  });
};
