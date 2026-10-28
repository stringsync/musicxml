import { Declaration } from './types';

export const getDefaultDeclaration = (): Declaration => ({
  attributes: { version: '1.0', encoding: 'UTF-8' },
});
