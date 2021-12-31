import { MusicXMLError } from '../../errors';
import { Descriptor, DESCRIPTOR_NAMES, Resolve } from './t';

const get = (value: any, key: string): any => value[key];
const isString = (value: unknown): value is string => typeof value === 'string';
const isNumber = (value: unknown): value is number => typeof value === 'number';
const isFunction = (value: unknown): value is (...args: any) => any => typeof value === 'function';
const isArray = (value: unknown): value is any[] => Array.isArray(value);
const isObject = (value: unknown): value is Record<string, any> => !!value && typeof value === 'object';
const isElement = (
  value: unknown
): value is { type: 'element'; attributes: Record<string, any>; content: Descriptor } =>
  !!value &&
  typeof value === 'object' &&
  get(value, 'type') === 'element' &&
  'attributes' in value &&
  'content' in value;
const isDescriptor = (value: unknown): value is Descriptor =>
  !!value && typeof value === 'object' && DESCRIPTOR_NAMES.has(get(value, 'type'));

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
        throw new MusicXMLError({
          symptom: 'cannot compute a zero value for descriptor',
          context: { descriptor: JSON.stringify(descriptor) },
          remedy: 'use a different descriptor or update getZeroValue to handle it',
        });
    }
  }
  if (isElement(value)) {
    const attributes = get(value, 'attributes');
    const content = get(value, 'content');
    return { ...value, attributes: getZeroValue(attributes), content: getZeroValue(content) } as unknown as Resolve<T>;
  }
  if (isObject(value)) {
    return Object.entries(value).reduce((next, [k, v]) => {
      next[k] = getZeroValue(v);
      return next;
    }, {} as any);
  }
  throw new MusicXMLError({
    symptom: 'cannot compute zero value for value',
    context: { value: JSON.stringify(value) },
    remedy: 'update getZeroValue to handle this type',
  });
};
