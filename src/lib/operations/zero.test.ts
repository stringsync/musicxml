import { schema, t, XMLElement } from '../schema';
import { zero } from './zero';

describe('zero', () => {
  it('returns the zero value for string constants', () => {
    expect(zero('foo')).toBe('foo');
  });

  it('returns the zero value for number constants', () => {
    expect(zero(42)).toBe(42);
  });

  it('returns the zero value for string descriptors', () => {
    expect(zero(t.string())).toBe('');
  });

  it('returns the zero value for regex descriptors', () => {
    expect(zero(t.regex({ pattern: /foo/, zero: 'foo' }))).toBe('foo');
  });

  it('returns the zero value for int descriptors', () => {
    expect(zero(t.int())).toBe(0);
  });

  it('returns the zero value for float descriptors', () => {
    expect(zero(t.float())).toBe(0);
  });

  it('returns the zero value for constant descriptors', () => {
    expect(zero(t.constant('foo'))).toBe('foo');
  });

  it('returns the zero value for date descriptors', () => {
    expect(zero(t.date())).toStrictEqual(new Date(1970, 0, 1, 0, 0, 0, 0));
  });

  it('returns the zero value for choices descriptors', () => {
    expect(zero(t.choices('foo', 'bar', 'baz'))).toBe('foo');
  });

  it('returns the zero value for optional descriptors', () => {
    expect(zero(t.optional(t.string()))).toBeNull();
  });

  it('returns the zero value for required descriptors', () => {
    expect(zero(t.required(t.string()))).toBe('');
  });

  it('returns the zero value for label descriptors', () => {
    expect(zero(t.label({ label: 'foo', value: t.string() }))).toBe('');
  });

  it('returns the zero value for zeroOrMore descriptors', () => {
    expect(zero(t.zeroOrMore(t.string()))).toStrictEqual([]);
  });

  it('returns the zero value for oneOrMore descriptors', () => {
    expect(zero(t.oneOrMore(t.string()))).toStrictEqual(['']);
  });

  it('returns the zero value for not descriptors', () => {
    expect(zero(t.not({ include: 'foo', exclude: t.string() }))).toBe('foo');
  });

  it('returns the zero value for an XMLElement constructor', () => {
    class Foo implements XMLElement<'foo', { foo: string }, never[]> {
      static readonly schema = schema('foo', { foo: t.string() }, []);
      schema = Foo.schema;
      attributes = { foo: '' };
      contents = [];
    }
    expect(zero(Foo)).toStrictEqual(new Foo());
  });

  it('returns the zero value for a function', () => {
    class Foo implements XMLElement<'foo', { foo: string }, never[]> {
      static readonly schema = schema('foo', { foo: t.string() }, []);
      schema = Foo.schema;
      attributes = { foo: '' };
      contents = [];
    }
    expect(zero(() => Foo)).toStrictEqual(new Foo());
  });

  it('returns the zero value for an array', () => {
    expect(zero([t.string(), t.int()])).toStrictEqual(['', 0]);
  });

  it('throws an error for an invalid child', () => {
    expect(() => zero(Symbol() as any)).toThrow();
  });
});
