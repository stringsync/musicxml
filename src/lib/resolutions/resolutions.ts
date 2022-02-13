import { NoneResolution, ResolvedResolution, ZeroResolution } from './types';

export const resolved = <T>(value: T): ResolvedResolution<T> => ({ type: 'resolved', value });

export const zero = <T>(value: T): ZeroResolution<T> => ({ type: 'zero', value });

export const none = (): NoneResolution => ({ type: 'none', value: undefined });
