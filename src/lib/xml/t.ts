import { MusicXMLError } from '../errors';

const isString = (value: any): value is string => typeof value === 'string';
const isNumber = (value: any): value is number => typeof value === 'number' && !isNaN(value);
const isFunction = (value: any): value is (...args: any) => any => typeof value === 'function';
const isArray = (value: any): value is any[] => Array.isArray(value);
const isObject = (value: any): value is Record<string, any> => !!value && typeof value === 'object';
const isNull = (value: any): value is null => value === null;
const isElement = (
  value: any
): value is { type: 'element'; schema: { attributes: Record<string, any>; content: Descriptor[] } } =>
  !!value && typeof value === 'object' && value.type === 'element';
export const isDescriptor = (value: any): value is Descriptor =>
  !!value && typeof value === 'object' && DESCRIPTOR_NAMES.has(value.type);

const identity = <T>(x: T) => x;

export type Descriptor = ReturnType<typeof t[keyof typeof t]>;

type CustomDescriptorOpts<T> = {
  zero: () => T;
  encode: (value: T) => string;
  decode: (str: string) => T;
  isValid: (value: T) => boolean;
};

type RegexDescriptorOpts = {
  pattern: RegExp;
  zero: () => string;
};

type RangeDescriptorOpts = {
  min: number;
  max: number;
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
  : T extends { type: 'regex' }
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
  : T extends { type: 'not'; exclude: infer E; include: infer I }
  ? Exclude<Resolve<I>, Resolve<E>>
  : T extends { [key: string]: any }
  ? { -readonly [K in keyof T]: Resolve<T[K]> }
  : never;

export const t = {
  string: () => ({ type: 'string' as const }),
  regex: (value: RegexDescriptorOpts) => ({ type: 'regex' as const, value }),
  int: () => ({ type: 'int' as const }),
  float: () => ({ type: 'float' as const }),
  range: (value: RangeDescriptorOpts) => ({ type: 'range' as const, value }),
  date: () => ({ type: 'date' as const }),
  constant: <T extends string | number>(value: T) => ({ type: 'constant' as const, value }),
  choices: <T extends [any, ...any[]]>(...values: T) => ({ type: 'choices' as const, values }),
  optional: <T>(value: T) => ({ type: 'optional' as const, value }),
  required: <T extends NonNullable<any>>(value: T) => ({ type: 'required' as const, value }),
  zeroOrMore: <T>(value: T) => ({ type: 'zeroOrMore' as const, value }),
  oneOrMore: <T>(value: T) => ({ type: 'oneOrMore' as const, value }),
  custom: <T extends CustomDescriptorOpts<any>>(value: T) => ({ type: 'custom' as const, value }),
  not: <N, T>(exclude: N, include: T) => ({ type: 'not' as const, exclude, include }),
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
      case 'regex':
        return descriptor.value.zero() as Resolve<T>;
      case 'int':
      case 'float':
        return 0 as Resolve<T>;
      case 'range':
        return descriptor.value.min as Resolve<T>;
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
      case 'not':
        return getZeroValue(descriptor.include);
      case 'date':
        return new Date(1970, 0, 1, 0, 0, 0, 0) as Resolve<T>;
      default:
        throw new MusicXMLError({
          symptom: 'cannot compute a zero value for descriptor',
          context: { descriptor },
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
    const schema = value.schema;
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
    context: { value },
    remedy: 'update getZeroValue to handle this type',
  });
};

/**
 * Determines if the value is valid based on the schema.
 *
 * @param value any value
 * @param schema the partial schema to check against
 * @returns whether the value is valid based on the schema
 */
export const isValid = (value: any, schema: any): boolean => {
  if (isDescriptor(schema)) {
    const descriptor = schema;
    switch (descriptor.type) {
      case 'string':
        return isString(value);
      case 'regex':
        return isString(value) && !!value.match(descriptor.value.pattern);
      case 'int':
        return isNumber(value) && Number.isInteger(value);
      case 'float':
        return isNumber(value);
      case 'range':
        return isNumber(value) && descriptor.value.min <= value && value <= descriptor.value.max;
      case 'constant':
        return value === getZeroValue(descriptor);
      case 'date':
        return value instanceof Date;
      case 'optional':
        return value === null || isValid(value, descriptor.value);
      case 'required':
        return isValid(value, descriptor.value);
      case 'zeroOrMore':
        return isArray(value) && value.every((v) => isValid(v, descriptor.value));
      case 'oneOrMore':
        return isArray(value) && value.length >= 1 && value.every((v) => isValid(v, descriptor.value));
      case 'choices':
        return descriptor.values.some((v) => isValid(value, v));
      case 'not':
        return !isValid(value, descriptor.exclude) && isValid(value, descriptor.include);
      case 'custom':
        return descriptor.value.isValid(value);
      default:
        return false;
    }
  }
  if (isString(schema)) {
    return value === schema;
  }
  if (isNumber(schema)) {
    return value === schema;
  }
  if (isNull(schema)) {
    return value === schema;
  }
  if (isArray(schema)) {
    return Array.isArray(value) && value.length === schema.length && schema.every((s, ndx) => isValid(value[ndx], s));
  }
  if (isObject(schema)) {
    return Object.entries(schema).every(([k, s]) => k in value && isValid(value[k], s));
  }
  throw new MusicXMLError({
    symptom: 'cannot compute validity for value',
    context: { value, schema },
    remedy: 'update isValid to handle this type',
  });
};

/**
 * Composes a decoder function from the schema.
 *
 * @param schema the schema to create the decoder from
 * @param decode the composed decoding function
 * @returns a decoder function that's composed from the schema
 */
export const getDecoder = (schema: any, decode = identity): ((v: any) => any) => {
  if (isDescriptor(schema)) {
    const descriptor = schema;
    switch (descriptor.type) {
      case 'string':
        return (v: any) => String(decode(v));
      case 'int':
        return (v: any) => {
          const value = parseInt(decode(v), 10);
          return isValid(value, descriptor) ? value : getZeroValue(descriptor);
        };
      case 'float':
      case 'range':
        return (v: any) => {
          const value = parseFloat(decode(v));
          return isValid(value, descriptor) ? value : getZeroValue(descriptor);
        };
      case 'constant':
        return () => descriptor.value;
      case 'date':
        return (v: any) => new Date(decode(v));
      case 'optional':
        decode = getDecoder(descriptor.value, decode);
        return (v: any) => decode(v) || null;
      case 'required':
        return getDecoder(descriptor.value, decode);
      case 'choices':
        return (v: any) => {
          const value = decode(v);
          return isValid(value, descriptor) ? value : getZeroValue(descriptor);
        };
      case 'not':
        return (v: any) => {
          const value = decode(v);
          return isValid(value, descriptor) ? value : getZeroValue(descriptor);
        };
      case 'zeroOrMore':
        decode = getDecoder(descriptor.value, decode);
        return (v: any) => {
          const value = v.map(decode);
          return isValid(value, descriptor) ? value : getZeroValue(descriptor);
        };
      case 'oneOrMore':
        decode = getDecoder(descriptor.value, decode);
        return (v: any) => {
          const value = v.map(decode);
          return isValid(value, descriptor) ? value : getZeroValue(descriptor);
        };
      case 'custom':
        return (v: any) => {
          const value = descriptor.value.decode(decode(v));
          return isValid(value, descriptor) ? value : getZeroValue(descriptor);
        };
      default:
        return decode;
    }
  }
  if (isArray(schema)) {
    const decodes = schema.map((s) => getDecoder(s, decode));
    return (vs: any) =>
      vs.map((v: string, ndx: number) => {
        const d = decodes[ndx];
        const s = schema[ndx];
        const value = d(v);
        return isValid(value, s) ? value : getZeroValue(s);
      });
  }
  throw new MusicXMLError({
    symptom: 'cannot compute decoder for value',
    context: { schema },
    remedy: 'update getDecoder to handle this type',
  });
};

/**
 * Composes a encoder function from the schema.
 *
 * @param schema the schema to create the encoder from
 * @param encode the composed encode function
 * @returns a encoder function that's composed from the schema
 */
export const getEncoder = (schema: any, encode = identity): any => {
  if (isDescriptor(schema)) {
    const descriptor = schema;
    switch (descriptor.type) {
      case 'string':
        return (v: string) => String(v);
      case 'int':
        return (v: number) => Math.round(encode(v)).toString();
      case 'float':
        return (v: number) => encode(v).toString();
      case 'range':
        return (v: number) => (isValid(v, descriptor) ? String(encode(v)) : String(encode(getZeroValue(schema))));
      case 'constant':
        return () => String(descriptor.value);
      case 'date':
        return (v: Date) => v.toISOString();
      case 'optional':
        encode = getEncoder(descriptor.value, encode);
        return (v: any) => {
          if (v === null) {
            return '';
          } else {
            return isValid(v, descriptor) ? encode(v) : '';
          }
        };
      case 'required':
        encode = getEncoder(descriptor.value, encode);
        return (v: any) => {
          return isValid(v, descriptor) ? encode(v) : encode(getZeroValue(descriptor));
        };
      case 'choices':
        return (v: any) => {
          for (const choice of descriptor.values) {
            if (isValid(v, choice)) {
              encode = getEncoder(choice, encode);
              return encode(v);
            }
          }
          return encode(getZeroValue(descriptor));
        };
      case 'not':
        encode = getEncoder(descriptor.include, encode);
        return (v: any) => {
          return isValid(v, descriptor) ? encode(v) : encode(getZeroValue(descriptor));
        };
      case 'zeroOrMore':
        encode = getEncoder(descriptor.value, encode);
        return (v: any) => {
          return isValid(v, descriptor) ? v.map(encode) : getZeroValue(descriptor).map(encode);
        };
      case 'oneOrMore':
        encode = getEncoder(descriptor.value, encode);
        return (v: any) => {
          return isValid(v, descriptor) ? v.map(encode) : getZeroValue(descriptor).map(encode);
        };
      case 'custom':
        return (v: any) => {
          return isValid(v, descriptor)
            ? descriptor.value.encode(encode(v))
            : descriptor.value.encode(getZeroValue(descriptor));
        };
      default:
        return encode;
    }
  }
  if (isString(schema)) {
    return () => schema;
  }
  if (isNumber(schema)) {
    return () => String(schema);
  }
  if (isArray(schema)) {
    const encodes = schema.map((s) => getEncoder(s, encode));
    return (vs: any) =>
      vs.map((v: any, ndx: number) => {
        const e = encodes[ndx];
        const s = schema[ndx];
        return isValid(v, s) ? e(v) : e(getZeroValue(s));
      });
  }
  throw new MusicXMLError({
    symptom: 'cannot compute encoder for value',
    context: { schema },
    remedy: 'update getEncoder to handle this type',
  });
};
