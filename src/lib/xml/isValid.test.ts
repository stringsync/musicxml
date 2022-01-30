import { isValid } from './isValid';
import { t } from './t';
import * as xml from './xml';

describe('isValid', () => {
  it('validates strings that match', () => {
    const result = isValid('foo', 'foo');
    expect(result).toBeTrue();
  });

  it('validates strings that do not match', () => {
    const result = isValid('foo', 'bar');
    expect(result).toBeFalse();
  });

  it('validates numbers that match', () => {
    const result = isValid(42, 42);
    expect(result).toBeTrue();
  });

  it('validates numbers that do not match', () => {
    const result = isValid(42, 41);
    expect(result).toBeFalse();
  });

  it('validates valid strings for string descriptors', () => {
    const descriptor = t.string();
    const result = isValid('foo', descriptor);
    expect(result).toBeTrue();
  });

  it('validates invalid strings for string descriptors', () => {
    const descriptor = t.string();
    const result = isValid(42, descriptor);
    expect(result).toBeFalse();
  });

  it('validates valid integers for int descriptors', () => {
    const descriptor = t.int();
    const result = isValid(42, descriptor);
    expect(result).toBeTrue();
  });

  it('validates invalid integers for int descriptors', () => {
    const descriptor = t.int();
    const result = isValid(4.2, descriptor);
    expect(result).toBeFalse();
  });

  it('validates valid floats for float descriptors', () => {
    const descriptor = t.float();
    const result = isValid(4.2, descriptor);
    expect(result).toBeTrue();
  });

  it('validates invalid floats for float descriptors', () => {
    const descriptor = t.float();
    const result = isValid('4.2', descriptor);
    expect(result).toBeFalse();
  });

  it('validates valid constants for string constants', () => {
    const descriptor = t.constant('foo');
    const result = isValid('foo', descriptor);
    expect(result).toBeTrue();
  });

  it('validates invalid constants for string constants', () => {
    const descriptor = t.constant('foo');
    const result = isValid('bar', descriptor);
    expect(result).toBeFalse();
  });

  it('validates valid constants for number constants', () => {
    const descriptor = t.constant(42);
    const result = isValid(42, descriptor);
    expect(result).toBeTrue();
  });

  it('validates invalid constants for number constants', () => {
    const descriptor = t.constant(42);
    const result = isValid(4.2, descriptor);
    expect(result).toBeFalse();
  });

  it('validates valid dates for date descriptors', () => {
    const descriptor = t.date();
    const result = isValid(new Date(), descriptor);
    expect(result).toBeTrue();
  });

  it('validates invalid dates for date descriptors', () => {
    const descriptor = t.date();
    const result = isValid('2022-01-22', descriptor);
    expect(result).toBeFalse();
  });

  it('validates valid choices for choice descriptors', () => {
    const descriptor = t.choices(t.int(), t.string());
    const result = isValid('foo', descriptor);
    expect(result).toBeTrue();
  });

  it('validates valid choices for complex choice descriptors', () => {
    const descriptor = t.choices([t.string(), t.string()], [t.string(), t.int()]);
    const result = isValid(['foo', 'foo'], descriptor);
    expect(result).toBeTrue();
  });

  it('validates invalid choices for complex choice descriptors', () => {
    const descriptor = t.choices([t.string(), t.string()], [t.string(), t.int()]);
    const result = isValid([42, 42], descriptor);
    expect(result).toBeFalse();
  });

  it('validates nulls for optional descriptors', () => {
    const descriptor = t.optional(t.string());
    const result = isValid(null, descriptor);
    expect(result).toBeTrue();
  });

  it('validates valid values for optional descriptors', () => {
    const descriptor = t.optional(t.string());
    const result = isValid('foo', descriptor);
    expect(result).toBeTrue();
  });

  it('validates invalid values for optional descriptors', () => {
    const descriptor = t.optional(t.string());
    const result = isValid(42, descriptor);
    expect(result).toBeFalse();
  });

  it('validates valid values for required descriptors', () => {
    const descriptor = t.required(t.string());
    const result = isValid('foo', descriptor);
    expect(result).toBeTrue();
  });

  it('validates invalid values for required descriptors', () => {
    const descriptor = t.required(t.string());
    const result = isValid(null, descriptor);
    expect(result).toBeFalse();
  });

  it('validates invalid values for complex descriptors', () => {
    const descriptor = t.required([t.optional(t.string()), t.optional(t.int())]);
    const result = isValid([null, 'foo'], descriptor);
    expect(result).toBeFalse();
  });

  it('validates valid values for not descriptors', () => {
    const descriptor = t.not({ include: t.string(), exclude: t.constant('foo') });
    const result = isValid('bar', descriptor);
    expect(result).toBeTrue();
  });

  it('validates invalid values for not descriptors', () => {
    const descriptor = t.not({ include: t.string(), exclude: t.constant('foo') });
    const result = isValid('foo', descriptor);
    expect(result).toBeFalse();
  });

  it('validates valid xml elements for xml element factories', () => {
    const Foo = xml.element('foo', { attributes: {}, content: [] }, {});
    const result = isValid(Foo(), Foo);
    expect(result).toBeTrue();
  });

  it('validates invalid xml elements for xml element factories', () => {
    const Foo = xml.element('foo', { attributes: {}, content: [] }, {});
    const Bar = xml.element('bar', { attributes: {}, content: [] }, {});

    const result = isValid(Foo(), Bar);

    expect(result).toBeFalse();
  });

  it('validates valid values for function descsriptors', () => {
    const Foo = xml.element('foo', { attributes: {}, content: [] }, {});
    const result = isValid(Foo(), () => Foo);
    expect(result).toBeTrue();
  });

  it('validates invalid values for function descriptors', () => {
    const Foo = xml.element('foo', { attributes: {}, content: [] }, {});
    const Bar = xml.element('bar', { attributes: {}, content: [] }, {});

    const result = isValid(Foo(), () => Bar);

    expect(result).toBeFalse();
  });

  it('validates valid arrays for array descriptors', () => {
    const Foo = xml.element('foo', { attributes: {}, content: [] }, {});
    const result = isValid([Foo(), null], [() => Foo, t.optional(Foo)]);
    expect(result).toBeTrue();
  });

  it('validates invalid arrays for array descriptors', () => {
    const Foo = xml.element('foo', { attributes: {}, content: [] }, {});
    const Bar = xml.element('bar', { attributes: {}, content: [] }, {});

    const result = isValid([Bar, Foo], [t.optional(Foo), t.choices(Foo, Bar)]);

    expect(result).toBeFalse();
  });
});
