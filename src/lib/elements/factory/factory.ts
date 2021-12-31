import { MusicXMLError } from '../../errors/MusicXMLError';
import * as helpers from './helpers';
import { Descriptor, Resolve } from './t';

export type XMLElementSchema<
  A extends Record<string, Descriptor> = Record<string, Descriptor>,
  C extends Descriptor | (() => XMLElement<any, any, any>) = Descriptor | (() => XMLElement<any, any, any>)
> = {
  attributes: A;
  content: C;
};

export type XMLElement<N extends string, S extends XMLElementSchema, M extends Record<string, Method>> = {
  type: 'element';
  name: N;
  schema: S;
  attributes: Resolve<S['attributes']>;
  content: Resolve<S['content']>;
} & M;

export type Method<T = any, A extends any[] = any[], R = any> = (this: T, ...args: A) => R;

const DISALLOWED_METHOD_NAMES = new Set(['type', 'name', 'schema', 'attributes', 'content']);

/**
 * Creates an element factory.
 *
 * @param name the name of the element
 * @param schema the schema of the element
 * @param methods a dictionary of methods for the element
 * @returns an element factory
 */
export const element =
  <N extends string, S extends XMLElementSchema, M extends Record<string, Method<XMLElement<N, S, M>, any, any>>>(
    name: N,
    schema: S,
    methods: M = {} as M
  ) =>
  (): XMLElement<N, S, M> => {
    for (const methodName in Object.keys(methods)) {
      if (DISALLOWED_METHOD_NAMES.has(methodName)) {
        throw new MusicXMLError({
          symptom: 'cannot use method because it will override a needed property',
          context: { methodName },
          remedy: `do not use methods in: ${Array.from(DISALLOWED_METHOD_NAMES).join(', ')}`,
        });
      }
    }

    const element = {
      type: 'element' as const,
      name,
      schema,
      attributes: helpers.getZeroValue(schema.attributes) as Resolve<S['attributes']>,
      content: helpers.getZeroValue(schema.content) as Resolve<S['content']>,
      ...methods,
    };

    for (const prop of Object.values(element)) {
      if (typeof prop === 'function') {
        prop.bind(element);
      }
    }

    return element;
  };
