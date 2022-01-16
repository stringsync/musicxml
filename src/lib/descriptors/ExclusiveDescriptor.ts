import { Descriptor, DescriptorEncodedValue } from './types';

export class ExclusiveDescriptor<E extends Descriptor, I extends Descriptor>
  implements Descriptor<Exclude<DescriptorEncodedValue<I>, DescriptorEncodedValue<E>>, string>
{
  constructor(private exclude: E, private include: I) {}

  zero(): Exclude<DescriptorEncodedValue<I>, DescriptorEncodedValue<E>> {
    return this.include.zero();
  }

  decode(raw: string): Exclude<DescriptorEncodedValue<I>, DescriptorEncodedValue<E>> {
    return this.include.decode(raw);
  }

  encode(value: Exclude<DescriptorEncodedValue<I>, DescriptorEncodedValue<E>>): string {
    return this.include.encode(value);
  }

  errors(value: Exclude<DescriptorEncodedValue<I>, DescriptorEncodedValue<E>>): string[] {
    if (this.exclude.errors(value).length === 0) {
      return [`value is forbidden: value=${value}`];
    }
    return this.include.errors(value);
  }
}
