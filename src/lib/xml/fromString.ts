import { MusicXMLError } from '../errors';
import { Descriptor, DescriptorChild } from '../schema';
import * as util from '../util';
import { isValid } from './isValid';
import { Resolution } from './types';
import { zero } from './zero';

export const fromString = (value: string, child: Extract<DescriptorChild, string | number | Descriptor>): any => {
  const resolve = (v: any): Resolution => {
    return isValid(v, child) ? { type: 'resolved', value: v } : { type: 'none', value: undefined };
  };

  const dfs = (value: string, child: Extract<DescriptorChild, string | number | Descriptor>): Resolution => {
    if (util.isString(child)) {
      return resolve(value);
    }
    if (util.isNumber(child)) {
      return resolve(value);
    }
    if (util.isDescriptor(child)) {
      switch (child.type) {
        case 'string':
          return resolve(value);
        case 'regex':
          return resolve(value);
        case 'int':
          return resolve(parseInt(value, 10));
        case 'float':
          return resolve(parseFloat(value));
        case 'constant':
          return resolve(value);
        case 'date':
          return resolve(new Date(value));
        case 'choices':
          for (const choice of child.choices) {
            const res = dfs(value, choice);
            if (res.type === 'resolved') {
              return res;
            }
          }
          return { type: 'none', value: undefined };
        case 'optional':
        case 'required':
          return resolve(dfs(value, child.value).value);
        case 'not':
          return resolve(dfs(value, child.include).value);
      }
    }
    throw new MusicXMLError({
      symptom: 'cannot decode string',
      context: { value, child },
      remedy: 'use a different child or value',
    });
  };

  const res = dfs(value, child);
  switch (res.type) {
    case 'resolved':
      return res.value;
    default:
      return zero(child);
  }
};
