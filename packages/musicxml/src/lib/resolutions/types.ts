export type Resolution<T = any> = ResolvedResolution<T> | ZeroResolution<T> | NoneResolution;

export type ResolvedResolution<T> = {
  type: 'resolved';
  value: T;
};

export type ZeroResolution<T> = {
  type: 'zero';
  value: T;
};

export type NoneResolution = {
  type: 'none';
  value: undefined;
};
