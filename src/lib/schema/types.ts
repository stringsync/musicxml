import { Ctor } from '../util';

export type XMLElementSchema<
  N extends string = string,
  A extends Record<string, Descriptor> = Record<string, any>,
  C extends ReadonlyArray<Descriptor> = ReadonlyArray<any>
> = {
  name: N;
  attributes: A;
  contents: C;
  className?: string;
};

export interface XMLElement<
  N extends string = string,
  A extends Record<string, any> = Record<string, any>,
  C extends any[] = any[]
> {
  schema: XMLElementSchema<N>;
  attributes: A;
  contents: C;
}

export type XMLElementCtor<
  N extends string = string,
  A extends Record<string, any> = Record<string, any>,
  C extends any[] = any[]
> = Ctor<XMLElement<N, A, C>> & { schema: XMLElementSchema<N> };

export type DescriptorChild =
  | string
  | number
  | Descriptor
  | XMLElementSchema
  | (() => XMLElementSchema)
  | XMLElementCtor
  | (() => XMLElementCtor)
  | Array<DescriptorChild>
  | ReadonlyArray<DescriptorChild>;

type Writable<T> = { -readonly [K in keyof T]: T[K] };

export type DescriptorChildValue<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends StringDescriptor
  ? string
  : T extends RegexDescriptor
  ? string
  : T extends IntDescriptor
  ? number
  : T extends FloatDescriptor
  ? number
  : T extends DateDescriptor
  ? Date
  : T extends ConstantDescriptor<infer V>
  ? V
  : T extends ChoicesDescriptor<infer V>
  ? DescriptorChildValue<V[number]>
  : T extends OptionalDescriptor<infer V>
  ? DescriptorChildValue<V> | null
  : T extends RequiredDescriptor<infer V>
  ? NonNullable<DescriptorChildValue<V>>
  : T extends LabelDescriptor<infer V>
  ? DescriptorChildValue<V>
  : T extends ZeroOrMoreDescriptor<infer V>
  ? DescriptorChildValue<V>
  : T extends ZeroOrMoreDescriptor<infer V>
  ? DescriptorChildValue<V>
  : T extends NotDescriptor<infer I, infer E>
  ? Exclude<DescriptorChildValue<I>, DescriptorChildValue<E>>
  : T extends XMLElementSchema<infer N, infer A, infer C>
  ? XMLElement<N, A, Writable<C>>
  : T extends () => XMLElementSchema<infer N, infer A, infer C>
  ? XMLElement<N, A, Writable<C>>
  : T extends XMLElementCtor<infer N, infer A, infer C>
  ? XMLElement<N, A, C>
  : T extends () => XMLElementCtor<infer N, infer A, infer C>
  ? XMLElement<N, A, C>
  : T extends any[]
  ? { [I in keyof T]: DescriptorChildValue<T[I]> }
  : T extends readonly any[]
  ? DescriptorChildValue<Writable<T>>
  : T extends Record<string, DescriptorChild>
  ? { [K in keyof T]: DescriptorChildValue<T[K]> }
  : never;

export type Descriptor =
  | StringDescriptor
  | RegexDescriptor
  | IntDescriptor
  | FloatDescriptor
  | DateDescriptor
  | ConstantDescriptor<any>
  | ChoicesDescriptor<[any, ...any[]]>
  | OptionalDescriptor<any>
  | RequiredDescriptor<any>
  | LabelDescriptor<any>
  | ZeroOrMoreDescriptor<any>
  | OneOrMoreDescriptor<any>
  | NotDescriptor<any, any>;

export type StringDescriptor = {
  type: 'string';
};

export type RegexDescriptor = {
  type: 'regex';
  pattern: RegExp;
  zero: string;
};

export type IntDescriptor = {
  type: 'int';
  min: number;
  max: number;
};

export type FloatDescriptor = {
  type: 'float';
  min: number;
  max: number;
};

export type DateDescriptor = {
  type: 'date';
};

export type ConstantDescriptor<T extends DescriptorChild> = {
  type: 'constant';
  value: T;
};

export type ChoicesDescriptor<T extends [DescriptorChild, ...DescriptorChild[]]> = {
  type: 'choices';
  choices: T;
};

export type OptionalDescriptor<T extends DescriptorChild> = {
  type: 'optional';
  value: T;
};

export type RequiredDescriptor<T extends DescriptorChild> = {
  type: 'required';
  value: T;
};

export type ZeroOrMoreDescriptor<T extends DescriptorChild> = {
  type: 'zeroOrMore';
  value: T;
};

export type OneOrMoreDescriptor<T extends DescriptorChild> = {
  type: 'oneOrMore';
  value: T;
};

export type NotDescriptor<I extends DescriptorChild, E extends DescriptorChild> = {
  type: 'not';
  include: I;
  exclude: E;
};

export type LabelDescriptor<T> = {
  type: 'label';
  label: string;
  value: T;
};

export type CommentDescriptor<T> = {
  type: 'comment';
  comment: string;
  value: T;
};
