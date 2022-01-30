import { MusicXMLError } from '../errors';
import * as helpers from './helpers';
import { Child } from './types';

export const zero = <T extends Child>(child: T): any => {
  if (helpers.isString(child)) {
    return child;
  }
  if (helpers.isNumber(child)) {
    return child;
  }
  if (helpers.isDescriptor(child)) {
    switch (child.type) {
      case 'string':
        return '';
      case 'regex':
        return child.zero;
      case 'int':
        return 0;
      case 'float':
        return 0;
      case 'constant':
        return child.value;
      case 'date':
        return new Date(1970, 0, 1, 0, 0, 0, 0);
      case 'choices':
        return zero(child.choices[0]);
      case 'optional':
        return null;
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
  if (helpers.isXMLElementFactory(child)) {
    return child();
  }
  if (helpers.isFunction(child)) {
    return zero(child());
  }
  if (helpers.isArray(child)) {
    return child.map(zero);
  }
  throw new MusicXMLError({
    symptom: 'cannot compute zero value',
    context: { child },
    remedy: 'use a different child or update zero',
  });
};
