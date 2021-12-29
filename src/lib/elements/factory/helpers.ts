import { Descriptor, Resolve } from './t';

const isString = (value: unknown): value is string => typeof value === 'string';
const isNumber = (value: unknown): value is number => typeof value === 'number';
const isDescriptor = (value: unknown): value is Descriptor => !!value && typeof value === 'object' && 'type' in value;
const isFunction = (value: unknown): value is (...args: any) => any => typeof value === 'function';
const isArray = (value: unknown): value is any[] => Array.isArray(value);
const isObject = (value: unknown): value is Record<string, any> => !!value && typeof value === 'object';

/**
 * Recursively computes the zero value for a a t.* schema.
 *
 * NOTE: Nested functions are automatically invoked. Do not include objects with functions that have mutative effects.
 *
 * @param value any value
 * @returns the zero value for the t.* schema.
 */
export const getZeroValue = <T>(value: T): Resolve<T> => {
  if (isString(value)) {
    return '' as Resolve<T>;
  }
  if (isNumber(value)) {
    return 0 as Resolve<T>;
  }
  if (isFunction(value)) {
    return getZeroValue(value());
  }
  if (isArray(value)) {
    return value.map((v) => getZeroValue(v)) as Resolve<T>;
  }
  if (isDescriptor(value)) {
    const descriptor = value;
    switch (descriptor.type) {
      case 'string':
        return '' as Resolve<T>;
      case 'int':
      case 'float':
        return 0 as Resolve<T>;
      case 'constant':
        return getZeroValue(descriptor.value) as Resolve<T>;
      case 'none':
      case 'optional':
        return null as Resolve<T>;
      case 'required':
        return getZeroValue(descriptor.value) as Resolve<T>;
      case 'list':
        return getZeroValue(descriptor.values) as Resolve<T>;
      case 'zeroOrMore':
      case 'oneOrMore':
        return getZeroValue(descriptor.value) as Resolve<T>;
      default:
        throw new Error('asdf');
    }
  }
  if (isObject(value)) {
    return Object.entries(value).reduce((next, [k, v]) => {
      next[k] = getZeroValue(v);
      return next;
    }, {} as any);
  }
  throw new TypeError(`cannot get zero value: value=${value}`);
};
