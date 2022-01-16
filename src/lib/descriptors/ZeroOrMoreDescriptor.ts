import { Descriptor, DescriptorEncodedValue } from './types';

export class ZeroOrMoreDescriptor<C extends Descriptor> implements Descriptor<DescriptorEncodedValue<C>[], string[]> {
  constructor(private child: C) {}

  zero(): DescriptorEncodedValue<C>[] {
    return [];
  }

  decode(raw: string[]): DescriptorEncodedValue<C>[] {
    return raw.map((r) => this.child.decode(r));
  }

  encode(value: DescriptorEncodedValue<C>[]): string[] {
    return value.map((v) => this.child.encode(v));
  }

  errors(value: DescriptorEncodedValue<C>[]): string[] {
    if (!Array.isArray(value)) {
      return [`must be an array: value=${value}`];
    }
    return value.flatMap((v) => this.child.errors(v));
  }
}
