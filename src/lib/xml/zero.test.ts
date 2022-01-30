import { t } from './t';
import * as xml from './xml';
import { zero } from './zero';

describe('zero', () => {
  it('returns the string for strings', () => {
    const result = zero('foo');
    expect(result).toBe('foo');
  });

  it('returns the number for numbers', () => {
    const result = zero(42);
    expect(result).toBe(42);
  });

  it('returns an empty string for string descriptors', () => {
    const descriptor = t.string();
    const result = zero(descriptor);
    expect(result).toBe('');
  });

  it('returns the descriptor zero property for regex descriptors', () => {
    const descriptor = t.regex({ pattern: /foo/, zero: 'foo' });
    const result = zero(descriptor);
    expect(result).toBe(descriptor.zero);
  });

  it('returns 0 for int descriptors', () => {
    const descriptor = t.int();
    const result = zero(descriptor);
    expect(result).toBe(0);
  });

  it('returns 0 for float descriptors', () => {
    const descriptor = t.float();
    const result = zero(descriptor);
    expect(result).toBe(0);
  });

  it('returns the constant for string constant descriptors', () => {
    const descriptor = t.constant('foo');
    const result = zero(descriptor);
    expect(result).toBe('foo');
  });

  it('returns the constant for number constant descriptors', () => {
    const descriptor = t.constant(42);
    const result = zero(descriptor);
    expect(result).toBe(42);
  });

  it('returns the epoch for date descriptors', () => {
    const descriptor = t.date();
    const result = zero(descriptor);
    expect(result).toStrictEqual(new Date(1970, 0, 1, 0, 0, 0, 0));
  });

  it('returns the zero value of the first choice for choice descriptors', () => {
    const descriptor = t.choices('foo', 'bar');
    const result = zero(descriptor);
    expect(result).toBe('foo');
  });

  it('returns null for optional descriptors', () => {
    const descriptor = t.optional('foo');
    const result = zero(descriptor);
    expect(result).toBeNull();
  });

  it('returns the zero value of the child for required descriptors', () => {
    const descriptor = t.required('foo');
    const result = zero(descriptor);
    expect(result).toBe('foo');
  });

  it('returns an empty array for zeroOrMore descriptors', () => {
    const descriptor = t.zeroOrMore(t.string());
    const result = zero(descriptor);
    expect(result).toBeArray();
    expect(result).toBeEmpty();
  });

  it('returns an array containing a single element for oneOrMore descriptors', () => {
    const descriptor = t.oneOrMore(t.string());
    const result = zero(descriptor);
    expect(result).toStrictEqual(['']);
  });

  it('retuns the zero value of the include property for not descriptors', () => {
    const descriptor = t.not({ include: t.string(), exclude: t.constant('foo') });
    const result = zero(descriptor);
    expect(result).toBe('');
  });

  it('returns an xml element for xml element factories', () => {
    const Foo = xml.element('foo', { attributes: { foo: t.string() }, content: [t.int()] }, {});
    const result = zero(Foo);
    expect(result).toStrictEqual(Foo());
  });

  it('returns an xml element for xml element factory functions', () => {
    const Foo = xml.element('foo', { attributes: { foo: t.string() }, content: [t.int()] }, {});
    const result = zero(() => Foo);
    expect(result).toStrictEqual(Foo());
  });

  it('returns a zero value array for arrays', () => {
    const Foo = xml.element('foo', { attributes: { foo: t.string() }, content: [t.int()] }, {});
    const result = zero([Foo, t.string(), t.int(), t.optional(t.string())]);
    expect(result).toStrictEqual([Foo(), '', 0, null]);
  });
});
