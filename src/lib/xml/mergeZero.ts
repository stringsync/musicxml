import { XMLElementSchema } from '../schema';
import { isValid } from './isValid';
import { zero } from './zero';

export const mergeZero = (attributes: Record<string, any> | undefined, schema: XMLElementSchema): any => {
  attributes = attributes || {};
  const result: any = {};
  for (const [name, descriptor] of Object.entries(schema.attributes)) {
    if (name in attributes && isValid(attributes[name], descriptor)) {
      result[name] = attributes[name];
    } else {
      zero(descriptor);
    }
  }
  return result;
};
