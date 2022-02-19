import * as schema from '../schema';
import { validate } from './validate';
import { zero } from './zero';

export const merge = (attributes: Record<string, any>, schema: schema.XMLElementSchema): any => {
  attributes = { ...attributes };
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
