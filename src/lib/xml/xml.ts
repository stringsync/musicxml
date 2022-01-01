import { MusicXMLError } from '../errors/MusicXMLError';
import { Descriptor, DESCRIPTOR_NAMES, Resolve } from './t';

type XMLElementSchema<
  A extends Record<string, Descriptor> = Record<string, Descriptor>,
  C extends Descriptor[] = Descriptor[]
> = {
  attributes: A;
  content: Readonly<C>;
};

type XMLElement<N extends string, S extends XMLElementSchema, M extends Record<string, Method>> = {
  type: 'element';
  name: N;
  schema: S;
  attributes: Resolve<S['attributes']>;
  content: Resolve<S['content']>;
} & M;

type Method<T = any> = (this: T, ...args: any[]) => any;

const DISALLOWED_METHOD_NAMES = new Set(['type', 'name', 'schema', 'attributes', 'content']);

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

/**
 * Recursively computes the zero value for a a t.* schema.
 *
 * NOTE: Nested functions are automatically invoked. Do not include objects with functions that have mutative effects.
 *
 * @param value any value
 * @returns the zero value for the t.* schema.
 */
const getZeroValue = <T>(value: T): Resolve<T> => {
  if (isDescriptor(value)) {
    const descriptor = value;
    switch (descriptor.type) {
      case 'string':
        return '' as Resolve<T>;
      case 'int':
      case 'float':
        return 0 as Resolve<T>;
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

/**
 * Creates an element factory.
 *
 * @param name the name of the element
 * @param schema the schema of the element
 * @param methods a dictionary of methods for the element
 * @returns an element factory
 */
export const element = <
  N extends string,
  S extends XMLElementSchema,
  M extends Record<string, Method<XMLElement<N, S, M>>>
>(
  name: N,
  schema: S,
  methods: M
) => {
  return (): XMLElement<N, S, M> => {
    for (const methodName in Object.keys(methods)) {
      if (DISALLOWED_METHOD_NAMES.has(methodName)) {
        throw new MusicXMLError({
          symptom: 'cannot use method because it will override an existing property',
          context: { methodName },
          remedy: `do not use methods in: ${Array.from(DISALLOWED_METHOD_NAMES).join(', ')}`,
        });
      }
    }

    const element: any = {
      type: 'element',
      name,
      schema,
      attributes: getZeroValue(schema.attributes),
      content: getZeroValue(schema.content),
      ...methods,
    };

    for (const method of Object.values(methods)) {
      method.bind(element);
    }

    return element;
  };
};
