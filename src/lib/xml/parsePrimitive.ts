import { MusicXMLError } from '../errors';
import * as operations from '../operations';
import * as resolutions from '../resolutions';
import * as util from '../util';
import { PrimitiveChild } from './types';

export const parsePrimitive = (value: string, child: PrimitiveChild) => {
  const resolution = resolve(value, child);
  switch (resolution.type) {
    case 'resolved':
    case 'zero':
      return resolution.value;
    default:
      return operations.zero(child);
  }
};

const check = (value: any, child: PrimitiveChild): resolutions.Resolution => {
  return operations.validate(value, child) ? resolutions.resolved(value) : resolutions.none();
};

const resolve = (value: string, child: PrimitiveChild): resolutions.Resolution => {
  if (util.isString(child)) {
    return check(value, child);
  }
  if (util.isNumber(child)) {
    return check(value, child);
  }
  if (util.isDescriptor(child)) {
    switch (child.type) {
      case 'string':
        return check(value, child);
      case 'regex':
        return check(value, child);
      case 'int':
        return check(parseInt(value, 10), child);
      case 'float':
        return check(parseFloat(value), child);
      case 'constant':
        return check(value, child);
      case 'date':
        return check(new Date(value), child);
      case 'choices':
        for (const choice of child.choices) {
          const res = resolve(value, choice);
          if (res.type === 'resolved') {
            return res;
          }
        }
        return { type: 'none', value: undefined };
      case 'optional':
      case 'required':
      case 'label':
        return check(resolve(value, child.value).value, child);
      case 'not':
        return check(resolve(value, child.include).value, child);
    }
  }
  throw new MusicXMLError('cannot decode string', { value, child });
};
