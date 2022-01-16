import { Descriptor, DescriptorEncodedValue } from './types';

export class OptionalDescriptor<C extends Descriptor> implements Descriptor<DescriptorEncodedValue<C | null>, string> {
  constructor(private child: C) {}

  zero(): DescriptorEncodedValue<C> | null {
    return null;
  }

  decode(raw: string): DescriptorEncodedValue<C | null> {
    return raw ? this.child.decode(raw) : null;
  }

  encode(value: DescriptorEncodedValue<C>): string {
    return value === null ? '' : this.child.encode(value);
  }

  errors(value: DescriptorEncodedValue<C> | null): string[] {
    if (value === null) {
      return [];
    }
    return this.child.errors(value);
  }
}
