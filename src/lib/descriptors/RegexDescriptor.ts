import { Descriptor } from './types';

export class RegexDescriptor implements Descriptor<string, string> {
  constructor(private pattern: RegExp, public zero: () => string) {}

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
    if (!value.match(this.pattern)) {
      return [`must match ${this.pattern}: value=${value}`];
    }
    return [];
  }
}
