import { schema, t, XMLElement } from '../schema';
import { validate } from './validate';

describe('validate', () => {
  it('asserts valid values for string constants', () => {
    expect(validate('foo', 'foo')).toBeTrue();
  });

  it('refutes valid values for string constants', () => {
    expect(validate('bar', 'foo')).toBeFalse();
  });

  it('asserts valid values for number constants', () => {
    expect(validate(42, 42)).toBeTrue();
  });

  it('refutes invalid values for number constants', () => {
    expect(validate(24, 42)).toBeFalse();
  });

  it('asserts valid values for string descriptors', () => {
    expect(validate('', t.string())).toBeTrue();
  });

  it('refutes invalid values for string descriptors', () => {
    expect(validate(42, t.string())).toBeFalse();
  });

  it('asserts valid values for int descriptors', () => {
    expect(validate(42, t.int())).toBeTrue();
  });

  it('refutes invalid values for int descriptors', () => {
    expect(validate(4.2, t.int())).toBeFalse();
  });

  it('asserts valid values for constant descriptors', () => {
    expect(validate('foo', t.constant('foo'))).toBeTrue();
  });

  it('refutes invalid values for constant descriptors', () => {
    expect(validate('bar', t.constant('foo'))).toBeFalse();
  });

  it('asserts valid values for date descriptors', () => {
    expect(validate(new Date(), t.date())).toBeTrue();
  });

  it('refutes invalid values for date descriptors', () => {
    expect(validate('2022-01-01', t.date())).toBeFalse();
  });

  it('asserts valid values for choice descriptors', () => {
    expect(validate('foo', t.choices('foo', 'bar'))).toBeTrue();
  });

  it('refutes invalid values for choice descriptors', () => {
    expect(validate('baz', t.choices('foo', 'bar'))).toBeFalse();
  });

  it('asserts valid values for label descriptors', () => {
    expect(validate('foo', t.label({ label: 'foo', value: t.string() }))).toBeTrue();
  });

  it('refutes invalid values for label descriptors', () => {
    expect(validate(42, t.label({ label: 'foo', value: t.string() }))).toBeFalse();
  });

  it('asserts valid values for optional descriptors', () => {
    expect(validate(null, t.optional(t.string()))).toBeTrue();
  });

  it('refutes invalid values for optional descriptors', () => {
    expect(validate(42, t.optional(t.string()))).toBeFalse();
  });

  it('asserts valid values for required descriptors', () => {
    expect(validate('foo', t.required(t.string()))).toBeTrue();
  });

  it('refutes invalid values for optional descriptors', () => {
    expect(validate(42, t.required(t.string()))).toBeFalse();
  });

  it('asserts valid values for zeroOrMore descriptors', () => {
    expect(validate([], t.zeroOrMore(t.string()))).toBeTrue();
  });

  it('refutes invalid values for zeroOrMore descriptors', () => {
    expect(validate([42], t.zeroOrMore(t.string()))).toBeFalse();
  });

  it('asserts valid values for oneOrMore descriptors', () => {
    expect(validate(['foo'], t.oneOrMore(t.string()))).toBeTrue();
  });

  it('refutes invalid values for oneOrMore descriptors', () => {
    expect(validate([], t.oneOrMore(t.string()))).toBeFalse();
  });

  it('asserts valid values for not descriptors', () => {
    expect(validate('foo', t.not({ include: t.string(), exclude: '' }))).toBeTrue();
  });

  it('refutes invalid values for not descriptors', () => {
    expect(validate('', t.not({ include: t.string(), exclude: '' }))).toBeFalse();
  });

  it('asserts valid values for schemas', () => {
    const Foo = schema('foo', { foo: t.string() }, []);
    expect(validate({ schema: Foo, attributes: { foo: '' }, contents: [] }, Foo)).toBeTrue();
  });

  it('refutes invalid values for schemas', () => {
    const Foo = schema('foo', {}, []);
    expect(validate('foo', Foo)).toBeFalse();
  });

  it('asserts valid values for XMLElement constructors', () => {
    class Foo implements XMLElement<'foo', { foo: string }, never[]> {
      static readonly schema = schema('foo', { foo: t.string() }, []);
      schema = Foo.schema;
      attributes = { foo: '' };
      contents = [];
    }
    expect(validate(new Foo(), Foo)).toBeTrue();
  });

  it('refutes invalid values for XMLElement constructors', () => {
    class Foo implements XMLElement<'foo', { foo: string }, never[]> {
      static readonly schema = schema('foo', { foo: t.string() }, []);
      schema = Foo.schema;
      attributes = { foo: '' };
      contents = [];
    }

    class Bar implements XMLElement<'bar', { bar: string }, never[]> {
      static readonly schema = schema('bar', { bar: t.string() }, []);
      schema = Bar.schema;
      attributes = { bar: '' };
      contents = [];
    }

    expect(validate(new Bar(), Foo)).toBeFalse();
  });

  it('asserts valid values for functions', () => {
    class Foo implements XMLElement<'foo', { foo: string }, never[]> {
      static readonly schema = schema('foo', { foo: t.string() }, []);
      schema = Foo.schema;
      attributes = { foo: '' };
      contents = [];
    }

    expect(validate(new Foo(), () => Foo)).toBeTrue();
  });

  it('refutes invalid values for functions', () => {
    class Foo implements XMLElement<'foo', { foo: string }, never[]> {
      static readonly schema = schema('foo', { foo: t.string() }, []);
      schema = Foo.schema;
      attributes = { foo: '' };
      contents = [];
    }

    class Bar implements XMLElement<'bar', { bar: string }, never[]> {
      static readonly schema = schema('bar', { bar: t.string() }, []);
      schema = Bar.schema;
      attributes = { bar: '' };
      contents = [];
    }

    expect(validate(new Bar(), () => Foo)).toBeFalse();
  });

  it('asserts valid values for arrays', () => {
    expect(validate(['foo', 42], [t.string(), t.int()])).toBeTrue();
  });

  it('refutes invalid values for arrays', () => {
    expect(validate([42, 'foo'], [t.string(), t.int()])).toBeFalse();
  });
});
