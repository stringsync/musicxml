import { MusicXMLError } from '../errors/MusicXMLError';
import { Descriptor, getZeroValue, Resolve } from './t';

export type XMLElementSchema<A extends Record<string, Descriptor>, C extends Descriptor[]> = {
  attributes: A;
  content: C;
};

export type XMLElement<N extends string, S extends XMLElementSchema<any, any>, M extends Record<string, Method>> = {
  type: 'element';
  name: N;
  schema: S;
  attributes: Resolve<S['attributes']>;
  content: Resolve<S['content']>;
} & M;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[] ? DeepPartial<U>[] : T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type XMLElementArgs<S extends XMLElementSchema<any, any>> = {
  attributes: DeepPartial<Resolve<S['attributes']>>;
  content?: Resolve<S['content']>;
};

type Method<T = any> = (this: T, ...args: any[]) => any;

export type XMLElementFactory<
  N extends string,
  S extends XMLElementSchema<any, any>,
  M extends Record<string, Method>
> = ((args?: DeepPartial<XMLElementArgs<S>>) => XMLElement<N, S, M>) & { elementName: N; schema: S };

const DISALLOWED_METHOD_NAMES = new Set(['type', 'name', 'schema', 'attributes', 'content']);

const toCamelCase = (str: string) => {
  return str
    .split('-')
    .map((part) => part[0].toUpperCase() + part.substring(1))
    .join('');
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
  S extends XMLElementSchema<any, any>,
  M extends Record<string, Method<XMLElement<N, S, M>>>
>(
  name: N,
  schema: S,
  methods: M
): XMLElementFactory<N, S, M> => {
  for (const methodName in Object.keys(methods)) {
    if (DISALLOWED_METHOD_NAMES.has(methodName)) {
      throw new MusicXMLError({
        symptom: 'cannot use method because it will override an existing property',
        context: { methodName },
        remedy: `do not use methods in: ${Array.from(DISALLOWED_METHOD_NAMES).join(', ')}`,
      });
    }
  }

  const camelCaseName = toCamelCase(name);

  // Dynamically assigns the camelCaseName as the function.name.
  const elementFactory = {
    [camelCaseName]: (args: DeepPartial<XMLElementArgs<S>> = {}): XMLElement<N, S, M> => {
      const elementMethods = { ...methods };

      const element: any = {
        type: 'element',
        name,
        schema,
        attributes: Object.assign(getZeroValue(schema.attributes), args.attributes),
        content: args.content || getZeroValue(schema.content),
        ...elementMethods,
      };

      for (const method of Object.values(elementMethods)) {
        method.bind(element);
      }

      return element;
    },
  }[camelCaseName];

  (elementFactory as any).elementName = name;
  (elementFactory as any).schema = schema;

  return elementFactory as typeof elementFactory & { elementName: N; schema: S };
};
