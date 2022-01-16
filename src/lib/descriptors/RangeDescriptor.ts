import { Descriptor } from './types';

export class RangeDescriptor implements Descriptor<number, string> {
  constructor(private min: number, private max: number) {}

  zero(): number {
    return this.min;
  }

  decode(raw: string): number {
    return parseFloat(raw);
  }

  encode(value: number): string {
    return value.toString();
  }

  errors(value: number): string[] {
    if (typeof value !== 'number' || isNaN(value)) {
      return [`must be a number: value=${value}`];
    }
    if (value < this.min) {
      return [`must be less than ${this.min}: value=${value}`];
    }
    if (value > this.max) {
      return [`must be greater than ${this.min}: value=${value}`];
    }
    return [];
  }
}
