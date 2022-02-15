import { MusicXMLError } from '../errors';
import { DescriptorChild } from '../schema';
import * as util from '../util';

export const zero = <T extends DescriptorChild>(child: T): any => {
  if (util.isString(child)) {
    return child;
  }
  if (util.isNumber(child)) {
    return child;
  }
  if (util.isDescriptor(child)) {
    switch (child.type) {
      case 'string':
        return '';
      case 'regex':
        return child.zero;
      case 'int':
        return Number.isFinite(child.min) ? child.min : 0;
      case 'float':
        return Number.isFinite(child.min) ? child.min : 0;
      case 'constant':
        return child.value;
      case 'date':
        return new Date(1970, 0, 1, 0, 0, 0, 0);
      case 'choices':
        return zero(child.choices[0]);
      case 'optional':
        return null;
      case 'label':
        return zero(child.value);
      case 'required':
        return zero(child.value);
      case 'zeroOrMore':
        return [];
      case 'oneOrMore':
        return [zero(child.value)];
      case 'not':
        return zero(child.include);
    }
  }
  if (util.isXMLElementCtor(child)) {
    return new child();
  }
  if (util.isFunction(child)) {
    return zero(child());
  }
  if (util.isArray(child)) {
    return child.map((c) => zero(c));
  }
  throw new MusicXMLError({
    symptom: 'cannot compute zero value',
    context: { child },
    remedy: 'use a different child or update zero',
  });
};
