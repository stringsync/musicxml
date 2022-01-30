import { DeepPartial } from '../util';

export type Child =
  | string
  | number
  | Descriptor
  | XMLElementFactory<string, any, Record<string, any>>
  | (() => XMLElementFactory<string, any, Record<string, any>>)
  | Array<Child>
  | ReadonlyArray<Child>;

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

export type ConstantDescriptor<T extends Child> = {
  type: 'constant';
  value: T;
};

export type ChoicesDescriptor<T extends [Child, ...Child[]]> = {
  type: 'choices';
  choices: T;
};

export type OptionalDescriptor<T extends Child> = {
  type: 'optional';
  value: T;
};

export type RequiredDescriptor<T extends Child> = {
  type: 'required';
  value: T;
};

export type ZeroOrMoreDescriptor<T extends Child> = {
  type: 'zeroOrMore';
  value: T;
};

export type OneOrMoreDescriptor<T extends Child> = {
  type: 'oneOrMore';
  value: T;
};

export type NotDescriptor<I extends Child, E extends Child> = {
  type: 'not';
  include: I;
  exclude: E;
};

export type DescriptorValue<T> = T extends string | number | null
  ? T
  : T extends any[]
  ? { [I in keyof T]: DescriptorValue<T[I]> }
  : T extends (...args: any[]) => { name: infer N; attributes: infer A; content: infer C }
  ? DescriptorValue<{ name: N; attributes: A; content: C }>
  : T extends () => infer V
  ? DescriptorValue<V>
  : T extends { type: 'string' }
  ? string
  : T extends { type: 'regex' }
  ? string
  : T extends { type: 'int' }
  ? number
  : T extends { type: 'float' }
  ? number
  : T extends { type: 'range' }
  ? number
  : T extends { type: 'constant'; value: infer V }
  ? DescriptorValue<V>
  : T extends { type: 'choices'; choices: Array<infer V> }
  ? DescriptorValue<V>
  : T extends { type: 'optional'; value: infer V }
  ? DescriptorValue<V> | null
  : T extends { type: 'required'; value: infer V }
  ? NonNullable<DescriptorValue<V>>
  : T extends { type: 'zeroOrMore'; value: infer V }
  ? DescriptorValue<V>[]
  : T extends { type: 'oneOrMore'; value: infer V }
  ? [DescriptorValue<V>, ...DescriptorValue<V>[]]
  : T extends { type: 'not'; exclude: infer E; include: infer I }
  ? Exclude<DescriptorValue<I>, DescriptorValue<E>>
  : T extends { [key: string]: any }
  ? { -readonly [K in keyof T]: DescriptorValue<T[K]> }
  : never;

export type XMLElementSchema<A extends Record<string, Descriptor>, C extends Descriptor[]> = {
  attributes: A;
  content: C;
};

export type XMLElementMethod<T = any> = (this: T, ...args: any[]) => any;

export type XMLElement<
  N extends string,
  S extends XMLElementSchema<any, any>,
  M extends Record<string, XMLElementMethod>
> = {
  type: 'element';
  name: N;
  schema: S;
  attributes: DescriptorValue<S['attributes']>;
  content: DescriptorValue<S['content']>;
} & M;

export type XMLElementFactory<
  N extends string,
  S extends XMLElementSchema<any, any>,
  M extends Record<string, XMLElementMethod>
> = ((args?: DeepPartial<XMLElementArgs<S>>) => XMLElement<N, S, M>) & { elementName: N; schema: S };

export type XMLElementArgs<S extends XMLElementSchema<any, any>> = {
  attributes: DeepPartial<DescriptorValue<S['attributes']>>;
  content?: DescriptorValue<S['content']>;
};

export type RawXMLElement =
  | {
      type: 'element';
      name: string;
      attributes: Record<string, string>;
      children: RawXMLElement[];
    }
  | {
      type: 'text';
      text: string;
    };

export type Parser = (xml: string) => RawXMLElement[];

export type Resolution =
  | {
      type: 'resolved';
      value: any;
    }
  | {
      type: 'zero';
      value: any;
    }
  | {
      type: 'none';
      value: undefined;
    };
