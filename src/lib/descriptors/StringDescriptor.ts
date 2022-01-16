import { Descriptor } from './types';

export class StringDescriptor implements Descriptor<string, string> {
  zero(): string {
    return '';
  }

  decode(raw: string): string {
    return raw;
  }

  encode(value: string): string {
    return value;
  }

  errors(value: string): string[] {
    if (typeof value !== 'string') {
      return [`must be a string: value=${value}`];
    }
    return [];
  }
}
