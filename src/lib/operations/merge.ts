import { DescriptorChildValue, XMLElementSchema } from '../schema';
import { validate } from './validate';
import { zero } from './zero';

/**
 * Merges a object of attributes into the zero value of a schema's attributes.
 *
 * @param attributes a object of attributes to merge into the zero value
 * @param schema the schema of the element
 */
export const merge = <S extends XMLElementSchema>(
  attributes: Record<string, any>,
  schema: S
): DescriptorChildValue<S['attributes']> => {
  const result: any = {};
  for (const [name, descriptor] of Object.entries(schema.attributes)) {
    if (name in attributes && validate(attributes[name], descriptor)) {
      result[name] = attributes[name];
    } else {
      result[name] = zero(descriptor);
    }
  }
  return result;
};
