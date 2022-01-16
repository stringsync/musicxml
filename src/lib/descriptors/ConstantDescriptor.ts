import { Descriptor } from './types';

export class ConstantDescriptor<C extends string> implements Descriptor<C, string> {
  constructor(private value: C) {}

  zero(): C {
    return this.value;
  }

  decode(value: string): C {
    return this.value;
  }

  encode(value: string): string {
    return this.value;
  }

  errors(value: string): string[] {
    return [];
  }
}
