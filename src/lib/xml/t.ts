import { MusicXMLError } from '../errors';

const get = (value: any, key: string): any => value[key];
const isString = (value: unknown): value is string => typeof value === 'string';
const isNumber = (value: unknown): value is number => typeof value === 'number';
const isFunction = (value: unknown): value is (...args: any) => any => typeof value === 'function';
const isArray = (value: unknown): value is any[] => Array.isArray(value);
const isObject = (value: unknown): value is Record<string, any> => !!value && typeof value === 'object';
const isNull = (value: unknown): value is null => value === null;
const isElement = (
  value: unknown
): value is { type: 'element'; schema: { attributes: Record<string, any>; content: Descriptor[] } } =>
  !!value && typeof value === 'object' && 'schema' in value && get(value, 'type') === 'element';
const isDescriptor = (value: unknown): value is Descriptor =>
  !!value && typeof value === 'object' && DESCRIPTOR_NAMES.has(get(value, 'type'));

export type Descriptor = ReturnType<typeof t[keyof typeof t]>;

export type CustomDescriptor<T> = {
  zero: () => T;
  encode: (value: T) => string;
  decode: (str: string) => T;
};

export type Resolve<T> = T extends string | number | null
  ? T
  : T extends any[]
  ? { [I in keyof T]: Resolve<T[I]> }
  : T extends (...args: any[]) => { name: infer N; attributes: infer A; content: infer C }
  ? Resolve<{ name: N; attributes: A; content: C }>
  : T extends () => infer V
  ? Resolve<V>
  : T extends { type: 'string' }
  ? string
  : T extends { type: 'color' }
  ? string
  : T extends { type: 'int' }
  ? number
  : T extends { type: 'float' }
  ? number
  : T extends { type: 'range' }
  ? number
  : T extends { type: 'constant'; value: infer V }
  ? Resolve<V>
  : T extends { type: 'choices'; values: Array<infer V> }
  ? Resolve<V>
  : T extends { type: 'optional'; value: infer V }
  ? Resolve<V> | null
  : T extends { type: 'required'; value: infer V }
  ? NonNullable<Resolve<V>>
  : T extends { type: 'zeroOrMore'; value: infer V }
  ? Resolve<V>[]
  : T extends { type: 'oneOrMore'; value: infer V }
  ? [Resolve<V>, ...Resolve<V>[]]
  : T extends { type: 'custom'; value: { zero: () => infer V } }
  ? V
  : T extends { [key: string]: any }
  ? { -readonly [K in keyof T]: Resolve<T[K]> }
  : never;

export const t = {
  string: () => ({ type: 'string' as const }),
  color: () => ({ type: 'color' as const }),
  int: () => ({ type: 'int' as const }),
  float: () => ({ type: 'float' as const }),
  range: (min: number, max: number) => ({ type: 'range' as const, min, max }),
  date: () => ({ type: 'date' as const }),
  constant: <T extends string | number>(value: T) => ({ type: 'constant' as const, value }),
  choices: <T extends [any, ...any[]]>(...values: T) => ({ type: 'choices' as const, values }),
  optional: <T>(value: T) => ({ type: 'optional' as const, value }),
  required: <T extends NonNullable<any>>(value: T) => ({ type: 'required' as const, value }),
  zeroOrMore: <T>(value: T) => ({ type: 'zeroOrMore' as const, value }),
  oneOrMore: <T>(value: T) => ({ type: 'oneOrMore' as const, value }),
  custom: <T extends CustomDescriptor<any>>(value: T) => ({ type: 'custom' as const, value }),
};

export const DESCRIPTOR_NAMES = new Set(Object.keys(t));

/**
 * Recursively computes the zero value for a a t.* schema.
 *
 * NOTE: Nested functions are automatically invoked. Do not include objects with functions that have mutative effects.
 *
 * @param value any value
 * @returns the zero value for the t.* schema.
 */
export const getZeroValue = <T>(value: T): Resolve<T> => {
  if (isDescriptor(value)) {
    const descriptor = value;
    switch (descriptor.type) {
      case 'string':
        return '' as Resolve<T>;
      case 'color':
        return '#000000' as Resolve<T>;
      case 'int':
      case 'float':
        return 0 as Resolve<T>;
      case 'range':
        return descriptor.min as Resolve<T>;
      case 'constant':
        return descriptor.value as Resolve<T>;
      case 'choices':
        if (isString(descriptor.values[0]) || isNumber(descriptor.values[0])) {
          return descriptor.values[0] as Resolve<T>;
        }
        return getZeroValue(descriptor.values[0]);
      case 'optional':
        return null as Resolve<T>;
      case 'required':
        return getZeroValue(descriptor.value) as Resolve<T>;
      case 'zeroOrMore':
        return [] as unknown as Resolve<T>;
      case 'oneOrMore':
        return [getZeroValue(descriptor.value)] as unknown as Resolve<T>;
      case 'custom':
        return descriptor.value.zero();
      default:
        throw new MusicXMLError({
          symptom: 'cannot compute a zero value for descriptor',
          context: { descriptor: JSON.stringify(descriptor) },
          remedy: 'use a different descriptor or update getZeroValue to handle it',
        });
    }
  }
  if (isNull(value)) {
    return null as Resolve<T>;
  }
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
    return value.map(getZeroValue) as Resolve<T>;
  }
  if (isElement(value)) {
    const schema = get(value, 'schema');
    return {
      ...value,
      attributes: getZeroValue(schema.attributes),
      content: getZeroValue(schema.content),
    } as unknown as Resolve<T>;
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
