import { MusicXMLError } from '../errors';
import * as operations from '../operations';
import * as resolutions from '../resolutions';
import { Descriptor, DescriptorChild } from '../schema';
import * as util from '../util';

export const serialize = <T extends Extract<DescriptorChild, string | number | Descriptor>>(
  value: any,
  child: T
): resolutions.Resolution<string> => {
  value = operations.validate(value, child) ? value : operations.zero(child);

  if (util.isString(child)) {
    return resolutions.resolved(value);
  }
  if (util.isNumber(child)) {
    return resolutions.resolved(value.toString());
  }
  if (util.isDescriptor(child)) {
    switch (child.type) {
      case 'string':
        return resolutions.resolved(value);
      case 'regex':
        return resolutions.resolved(value);
      case 'int':
        return resolutions.resolved(Math.round(value).toString());
      case 'float':
        return resolutions.resolved(value.toString());
      case 'constant':
        return resolutions.resolved(String(value));
      case 'date':
        return resolutions.resolved(value.toISOString());
      case 'choices':
        return resolutions.resolved(String(value));
      case 'label':
        return serialize(value, child.value);
      case 'optional':
        return util.isNull(value) ? { type: 'none', value: undefined } : resolutions.resolved(String(value));
      case 'required':
        return resolutions.resolved(String(value));
      case 'not':
        return resolutions.resolved(String(value));
    }
  }
  throw new MusicXMLError({
    symptom: 'cannot encode string',
    context: { value, child },
    remedy: 'use a different child or value',
  });
};