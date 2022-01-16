export interface Descriptor<V = any, R = any> {
  zero(): V;
  decode(raw: R): V;
  encode(value: V): R;
  errors(value: V): string[];
}

export type DescriptorRawValue<T> = T extends Descriptor<any, infer R> ? R : never;

export type DescriptorEncodedValue<T> = T extends Descriptor<infer V, any> ? DescriptorEncodedValue<V> : T;
