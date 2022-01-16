import { Descriptor } from './types';

export class IntegerDescriptor implements Descriptor<number, string> {
  zero(): number {
    return 0;
  }

  decode(raw: string): number {
    return parseInt(raw, 10);
  }

  encode(value: number): string {
    return value.toString();
  }

  errors(value: number): string[] {
    if (typeof value !== 'number' || isNaN(value)) {
      return [`must be a number: value=${value}`];
    }
    if (!Number.isInteger(value)) {
      return [`must be an integer: value=${value}`];
    }
    return [];
  }
}
