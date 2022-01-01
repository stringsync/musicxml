import { MusicXMLError } from '../errors/MusicXMLError';
import { Descriptor, getZeroValue, Resolve } from './t';

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
