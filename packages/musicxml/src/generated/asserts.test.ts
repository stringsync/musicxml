import { describe, expect, it } from 'bun:test';
import * as asserts from './asserts';

describe('asserts', () => {
  it.each(Object.values(asserts))('%p refutes unrelated values', (assert) => {
    expect(assert(Symbol())).toBeFalse();
  });
});
