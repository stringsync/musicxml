import { Descriptor, DescriptorEncodedValue } from './types';

export class RequiredDescriptor<C extends Descriptor> implements Descriptor<DescriptorEncodedValue<C>, string> {
  constructor(private child: C) {}

  zero(): DescriptorEncodedValue<C> {
    return this.child.zero();
  }

  decode(raw: string): DescriptorEncodedValue<C> {
    return this.child.decode(raw);
  }

  encode(value: DescriptorEncodedValue<C>): string {
    return this.child.encode(value);
  }

  errors(value: DescriptorEncodedValue<C>): string[] {
    if (value === null) {
      return [`must have a value: value=${value}`];
    }
    return this.child.errors(value);
  }
}
