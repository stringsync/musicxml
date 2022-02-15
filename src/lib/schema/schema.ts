import { Descriptor, XMLElementSchema } from './types';

type SchemaOpts = {
  className: string;
};

/**
 * Creates an XMLElementSchema object.
 *
 * @param name the element name
 * @param attributes the attributes as a key-value mapping of descriptors
 * @param contents the contents as an array of descriptors
 * @returns an XMLElementSchema object
 */
export const schema = <N extends string, A extends Record<string, Descriptor>, C extends ReadonlyArray<Descriptor>>(
  name: N,
  attributes: A,
  contents: C,
  opts: Partial<SchemaOpts> = {}
): XMLElementSchema<N, A, C> => ({ name, attributes, contents, ...opts });
