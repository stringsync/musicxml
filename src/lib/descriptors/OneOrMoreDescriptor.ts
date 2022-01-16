import { Descriptor, DescriptorEncodedValue } from './types';

export class OneOrMoreDescriptor<C extends Descriptor>
  implements Descriptor<[DescriptorEncodedValue<C>, ...DescriptorEncodedValue<C>[]], string[]>
{
  constructor(private child: C) {}

  zero(): [DescriptorEncodedValue<C>, ...DescriptorEncodedValue<C>[]] {
    return [this.child.zero()];
  }

  decode(raw: string[]): [DescriptorEncodedValue<C>, ...DescriptorEncodedValue<C>[]] {
    const values = raw.map((r) => this.child.decode(r));
    const [first, ...rest] = values;
    return [first || this.child.zero(), ...rest];
  }

  encode(value: [DescriptorEncodedValue<C>, ...DescriptorEncodedValue<C>[]]): string[] {
    return value.map((v) => this.child.encode(v));
  }

  errors(value: [DescriptorEncodedValue<C>, ...DescriptorEncodedValue<C>[]]): string[] {
    if (!Array.isArray(value)) {
      return [`must be an array: value=${value}`];
    }
    const errors = new Array<string>();
    if (value.length < 1) {
      errors.push(`must have at least 1 element: value=${value}`);
    }
    return [...errors, ...value.flatMap((v) => this.child.errors(v))];
  }
}
