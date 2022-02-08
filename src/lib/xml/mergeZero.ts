import { XMLElementSchema } from '../schema';
import { isValid } from './isValid';
import { zero } from './zero';

export const mergeZero = (attributes: Record<string, any> | undefined, schema: XMLElementSchema) => {
  const result = Object.assign({}, attributes);
  for (const [name, descriptor] of Object.entries(schema.attributes)) {
    if (name in result && isValid(result[name], descriptor)) {
      continue;
    }
    result[name] = zero(descriptor);
  }
  return result;
};
