import { Ctor } from '../util';

export type XMLElementSchema<
  N extends string = string,
  A extends Record<string, Descriptor> = Record<string, any>,
  C extends ReadonlyArray<Descriptor> = ReadonlyArray<any>
> = {
  name: N;
  attributes: A;
  contents: C;
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
