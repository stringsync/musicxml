import * as helpers from './helpers';
import { Descriptor, Resolve } from './t';

export type XMLElementSchema<
  A extends Record<string, Descriptor> = Record<string, Descriptor>,
  C extends Descriptor | (() => XMLElement<any, any>) = Descriptor | (() => XMLElement<any, any>)
> = {
  attributes: A;
  content: C;
};

export type XMLElement<N extends string, S extends XMLElementSchema> = {
  type: 'element';
  name: N;
  schema: S;
  attributes: Resolve<S['attributes']>;
  content: Resolve<S['content']>;
};

/**
 * Creates an element factory.
 *
 * @param name the name of the element
 * @param schema the schema of the element
 * @returns an element factory
 */
export const element =
  <N extends string, S extends XMLElementSchema>(name: N, schema: S) =>
  (): XMLElement<N, S> => {
    return {
      type: 'element',
      name,
      schema,
      attributes: helpers.getZeroValue(schema.attributes) as Resolve<S['attributes']>,
      content: helpers.getZeroValue(schema.content) as Resolve<S['content']>,
    };
  };
