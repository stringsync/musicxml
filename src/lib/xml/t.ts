export type Descriptor = ReturnType<typeof t[keyof typeof t]>;

export type CustomDescriptor<T> = {
  zero: () => T;
  encode: (value: T) => string;
  decode: (str: string) => T;
};

export type Resolve<T> = T extends string | number | null
  ? T
  : T extends any[]
  ? { [I in keyof T]: Resolve<T[I]> }
  : T extends (...args: any[]) => { name: infer N; attributes: infer A; content: infer C }
  ? Resolve<{ name: N; attributes: A; content: C }>
  : T extends () => infer V
  ? Resolve<V>
  : T extends { type: 'string' }
  ? string
  : T extends { type: 'int' }
  ? number
  : T extends { type: 'float' }
  ? number
  : T extends { type: 'constant'; value: infer V }
  ? Resolve<V>
  : T extends { type: 'choices'; values: Array<infer V> }
  ? Resolve<V>
  : T extends { type: 'optional'; value: infer V }
  ? Resolve<V> | null
  : T extends { type: 'required'; value: infer V }
  ? NonNullable<Resolve<V>>
  : T extends { type: 'zeroOrMore'; value: infer V }
  ? Resolve<V>[]
  : T extends { type: 'oneOrMore'; value: infer V }
  ? [Resolve<V>, ...Resolve<V>[]]
  : T extends { type: 'custom'; value: { zero: () => infer V } }
  ? V
  : T extends { [key: string]: any }
  ? { -readonly [K in keyof T]: Resolve<T[K]> }
  : never;

export const t = {
  string: () => ({ type: 'string' as const }),
  int: () => ({ type: 'int' as const }),
  float: () => ({ type: 'float' as const }),
  date: () => ({ type: 'date' as const }),
  constant: <T extends string | number>(value: T) => ({ type: 'constant' as const, value }),
  choices: <T extends [any, ...any[]]>(...values: T) => ({ type: 'choices' as const, values }),
  optional: <T>(value: T) => ({ type: 'optional' as const, value }),
  required: <T extends NonNullable<any>>(value: T) => ({ type: 'required' as const, value }),
  zeroOrMore: <T>(value: T) => ({ type: 'zeroOrMore' as const, value }),
  oneOrMore: <T>(value: T) => ({ type: 'oneOrMore' as const, value }),
  custom: <T extends CustomDescriptor<any>>(value: T) => ({ type: 'custom' as const, value }),
};

export const DESCRIPTOR_NAMES = new Set(Object.keys(t));
