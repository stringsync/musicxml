export type AnyFunction = (...args: any[]) => any;

export type Ctor<T> = {
  new (...args: any[]): T;
};
