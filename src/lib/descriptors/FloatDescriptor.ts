import { Descriptor } from './types';

export class FloatDescriptor implements Descriptor<number, string> {
  zero(): number {
    return 0;
  }

  decode(raw: string): number {
    return parseFloat(raw);
  }

  encode(value: number): string {
    return value.toString();
  }

  errors(value: number): string[] {
    if (typeof value !== 'number' || isNaN(value)) {
      return [`must be a number: ${value}`];
    }
    return [];
  }
}
