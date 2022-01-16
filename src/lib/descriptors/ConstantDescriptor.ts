import { Descriptor } from './types';

export class ConstantDescriptor<C extends string> implements Descriptor<C, string> {
  constructor(private value: C) {}

  zero(): C {
    return this.value;
  }

  decode(): C {
    return this.value;
  }

  encode(): string {
    return this.value;
  }

  errors(): string[] {
    return [];
  }
}
