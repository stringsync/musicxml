import { MusicXMLError } from '../errors/MusicXMLError';
import { DeepPartial } from '../util';
import * as helpers from './helpers';
import { XMLElement, XMLElementArgs, XMLElementFactory, XMLElementMethod, XMLElementSchema } from './types';
import { zero } from './zero';

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
  S extends XMLElementSchema<any, any>,
  M extends Record<string, XMLElementMethod<XMLElement<N, S, M>>>
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

  const camelCaseName = helpers.toCamelCase(name);

  // Dynamically assigns the camelCaseName as the function.name.
  const elementFactory = {
    [camelCaseName]: (args: DeepPartial<XMLElementArgs<S>> = {}): XMLElement<N, S, M> => {
      const elementMethods = { ...methods };

      const attributes: any = {};
      const argAttributes: any = args.attributes || {};
      for (const name of Object.keys(schema.attributes)) {
        attributes[name] = zero(argAttributes[name] ?? schema.attributes[name]);
      }

      const element: any = {
        type: 'element',
        name,
        schema,
        attributes,
        content: args.content || zero(schema.content),
        ...elementMethods,
      };

      for (const method of Object.values(elementMethods)) {
        method.bind(element);
      }

      return element;
    },
  }[camelCaseName] as XMLElementFactory<N, S, M>;

  elementFactory.elementName = name;
  elementFactory.schema = schema;

  return elementFactory;
};
