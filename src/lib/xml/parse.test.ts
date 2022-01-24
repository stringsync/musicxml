import { t } from '.';
import { parse } from './parse';
import * as xml from './xml';

describe('parse', () => {
  it('returns the zero value of a simple descriptor when no raw elements are given', () => {
    const Foo = xml.element('foo', { attributes: {}, content: [] as const }, {});

    const element = parse([], t.required(Foo));

    expect(element).toStrictEqual(Foo());
  });

  it('returns the zero value of a complex descriptor when no raw elements are given', () => {
    const Foo = xml.element(
      'foo',
      {
        attributes: {},
        content: [t.required(() => Bar), t.choices([() => Baz, () => Baz], [() => Bar, () => Bar, () => Bar])] as const,
      },
      {}
    );
    const Bar = xml.element('bar', { attributes: {}, content: [t.choices(() => Baz)] as const }, {});
    const Baz = xml.element('baz', { attributes: { baz: t.int() }, content: [] as const }, {});

    const element = parse([], t.choices(Foo, Bar));

    expect(element).toStrictEqual(Foo());
  });

  it('returns the zero value of a descriptor array when no raw elements are given', () => {
    const Foo = xml.element('foo', { attributes: {}, content: [] }, {});

    const elements = parse([], [t.optional(Foo), t.required(Foo), t.choices(Foo)]);

    expect(elements).toStrictEqual([null, Foo(), Foo()]);
  });

  it('parses raw elements against a simple descriptor', () => {
    const Foo = xml.element('foo', { attributes: { foo: t.int() }, content: [] as const }, {});

    const element = parse(
      [
        {
          type: 'element',
          name: 'foo',
          attributes: { foo: '42' },
          children: [{ type: 'text', text: 'baz' }],
        },
      ],
      t.required(Foo)
    );

    expect(element).toStrictEqual(Foo({ attributes: { foo: 42 }, content: [] }));
  });

  it('ignores superfluous raw elements', () => {
    const Foo = xml.element('foo', { attributes: {}, content: [t.required(t.string())] as const }, {});

    const element = parse(
      [
        { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'first' }] },
        { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'second' }] },
      ],
      t.required(Foo)
    );

    expect(element).toStrictEqual(Foo({ content: ['first'] }));
  });

  it('parses raw elements against a zeroOrMore descriptor', () => {
    const Foo = xml.element('foo', { attributes: {}, content: [t.required(t.string())] as const }, {});

    const elements = parse(
      [
        { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'first' }] },
        { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'second' }] },
      ],
      t.zeroOrMore(Foo)
    );

    expect(elements).toStrictEqual([Foo({ content: ['first'] }), Foo({ content: ['second'] })]);
  });

  it('parses raw elements against a oneOrMore descriptor with enough elements', () => {
    const Foo = xml.element('foo', { attributes: {}, content: [t.required(t.string())] as const }, {});

    const elements = parse(
      [
        { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'first' }] },
        { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'second' }] },
      ],
      t.oneOrMore(Foo)
    );

    expect(elements).toStrictEqual([Foo({ content: ['first'] }), Foo({ content: ['second'] })]);
  });

  it('parses raw elements against a choice descriptor', () => {
    const Foo = xml.element('foo', { attributes: {}, content: [t.required(t.string())] as const }, {});
    const Bar = xml.element('bar', { attributes: {}, content: [t.required(t.int())] as const }, {});

    const element = parse(
      [
        {
          type: 'element',
          name: 'bar',
          attributes: {},
          children: [{ type: 'text', text: '42' }],
        },
      ],
      t.choices(Foo, Bar)
    );

    expect(element).toStrictEqual(Bar({ content: [42] }));
  });

  it('ignores irrelevant elements', () => {
    const Foo = xml.element('foo', { attributes: {}, content: [] as const }, {});

    const element = parse(
      [
        {
          type: 'element',
          name: 'baz',
          attributes: { baz: '42' },
          children: [{ type: 'text', text: 'baz' }],
        },
      ],
      t.required(Foo)
    );

    expect(element).toStrictEqual(Foo());
  });

  it('parses nested elements missing data', () => {
    const Foo = xml.element('foo', { attributes: {}, content: [t.required(() => Bar)] }, {});
    const Bar = xml.element('bar', { attributes: { bar: t.date() }, content: [] }, {});

    const element = parse(
      [
        {
          type: 'element',
          name: 'foo',
          attributes: {},
          children: [],
        },
      ],
      t.required(Foo)
    );

    expect(element).toStrictEqual(Foo());
    expect(element.content[0]).toStrictEqual(Bar());
  });

  it('parses choice descriptors with nested arrays', () => {
    const Foo = xml.element('foo', { attributes: {}, content: [] }, {});
    const Bar = xml.element('bar', { attributes: {}, content: [] }, {});

    const element = parse(
      [
        { type: 'element', name: 'bar', attributes: {}, children: [] },
        { type: 'element', name: 'foo', attributes: {}, children: [] },
      ],
      t.choices([Bar, Bar], [t.choices(Foo, Bar), Foo])
    );

    expect(element).toStrictEqual([Bar(), Foo()]);
  });

  it('parses choice descriptors with nested arrays of optionals', () => {
    const Bar = xml.element('bar', { attributes: {}, content: [t.string()] }, {});
    const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});

    const elements = parse(
      [
        { type: 'element', name: 'bar', attributes: {}, children: [{ type: 'text', text: 'bar' }] },
        { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'foo' }] },
      ],
      t.choices([t.optional(Foo), Bar], [t.optional(Bar), Foo])
    );

    // Even though [null, Bar()] is the "first match", [Bar(), Foo()] consumes all the elements, so it should be used
    // instead.
    expect(elements).toStrictEqual([Bar({ content: ['bar'] }), Foo({ content: ['foo'] })]);
  });
});
