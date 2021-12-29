type TODO = never;

export type Descriptor = ReturnType<typeof t[keyof typeof t]>;

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
  : T extends { type: 'oneOf' }
  ? TODO
  : T extends { type: 'list'; values: infer V }
  ? Resolve<V>
  : T extends { type: 'optional'; value: infer V }
  ? Resolve<V> | null
  : T extends { type: 'required'; value: infer V }
  ? NonNullable<Resolve<V>>
  : T extends { type: 'zeroOrMore'; value: infer V }
  ? Resolve<V>[]
  : T extends { type: 'oneOrMore'; value: infer V }
  ? [Resolve<V>, ...Resolve<V>[]]
  : T extends { type: 'none' }
  ? null
  : T extends { [key: string]: any }
  ? { [K in keyof T]: Resolve<T[K]> }
  : never;

export const t = {
  string: () => ({ type: 'string' as const }),
  int: () => ({ type: 'int' as const }),
  float: () => ({ type: 'float' as const }),
  constant: <T>(value: T) => ({ type: 'constant' as const, value }),
  oneOf: <T extends any[]>(...values: T) => ({ type: 'oneOf' as const, values }),
  list: <T extends any[]>(...values: T) => ({ type: 'list' as const, values }),
  optional: <T>(value: T) => ({ type: 'optional' as const, value }),
  required: <T extends NonNullable<any>>(value: T) => ({ type: 'required' as const, value }),
  zeroOrMore: <T>(value: T) => ({ type: 'zeroOrMore' as const, value }),
  oneOrMore: <T>(value: T) => ({ type: 'oneOrMore' as const, value }),
  none: () => ({ type: 'none' as const }),
};
