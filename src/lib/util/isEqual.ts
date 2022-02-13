import { isArray, isObject } from './typeGuards';

export const isEqual = (a: any, b: any): boolean => {
  if (isArray(a)) {
    return isArray(b) && a.length === b.length && a.every((el, ndx) => isEqual(el, b[ndx]));
  }
  if (isObject(a)) {
    return isObject(b) && Object.keys(a).every((key) => isEqual(a[key], b[key]));
  }
  return a === b;
};
