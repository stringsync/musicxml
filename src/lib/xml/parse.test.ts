import { t } from '.';
import { parse } from './parse';
import * as xml from './xml';

describe('parse', () => {
  const Baz = xml.element(
    'baz',
    {
      attributes: { baz: t.int() },
      content: [t.optional(t.string())] as const,
    },
    {}
  );
  const Bar = xml.element(
    'bar',
    {
      attributes: {
        bar: t.constant('bar'),
      },
      content: [t.string(), t.required(Baz)] as const,
    },
    {}
  );
  const Foo = xml.element(
    'foo',
    {
      attributes: {
        foo: t.string(),
      },
      content: [
        t.oneOrMore(t.choices(Bar, Baz)),
        t.required(Baz),
        t.optional(Bar),
        t.choices([t.constant('bar'), Bar], [t.constant('baz'), Baz]),
      ] as const,
    },
    {}
  );

  it('parses with root descriptors', () => {
    const element = parse([], t.required(Baz));
    expect(element).toStrictEqual(Baz());
  });

  it('parses with complex root descriptors', () => {
    const element = parse([], t.required(Foo));
    expect(element).toStrictEqual(Foo());
  });

  it('parses with array descriptors', () => {
    const elements = parse([], [t.optional(Foo)]);
    expect(elements).toStrictEqual([null]);
  });

  it('parses using the raw elements', () => {
    const element = parse(
      [
        {
          type: 'element',
          name: 'baz',
          attributes: { baz: '42' },
          children: [{ type: 'text', text: 'baz' }],
        },
      ],
      t.required(Baz)
    );

    expect(element).toStrictEqual(
      Baz({
        attributes: {
          baz: 42,
        },
        content: ['baz'],
      })
    );
  });

  it('parses multiple raw elements', () => {
    const elements = parse(
      [
        {
          type: 'element',
          name: 'baz',
          attributes: { baz: '42' },
          children: [{ type: 'text', text: 'baz' }],
        },
        {
          type: 'element',
          name: 'baz',
          attributes: { baz: '84' },
          children: [{ type: 'text', text: 'bazbaz' }],
        },
      ],
      t.zeroOrMore(Baz)
    );

    expect(elements).toStrictEqual([
      Baz({
        attributes: {
          baz: 42,
        },
        content: ['baz'],
      }),
      Baz({
        attributes: {
          baz: 84,
        },
        content: ['bazbaz'],
      }),
    ]);
  });

  it('parses with choice root descriptors', () => {
    const element = parse(
      [
        {
          type: 'element',
          name: 'baz',
          attributes: { baz: '42' },
          children: [{ type: 'text', text: 'baz' }],
        },
      ],
      t.choices(Bar, Baz)
    );

    expect(element).toStrictEqual(Baz({ attributes: { baz: 42 }, content: ['baz'] }));
  });

  it('parses ignoring irrelevant elements', () => {
    const element = parse(
      [
        {
          type: 'element',
          name: 'baz',
          attributes: { baz: '42' },
          children: [{ type: 'text', text: 'baz' }],
        },
      ],
      t.optional(Bar)
    );

    expect(element).toStrictEqual(null);
  });

  it('parses nested elements', () => {
    const element = parse(
      [
        {
          type: 'element',
          name: 'bar',
          attributes: { bar: 'bar' },
          children: [
            { type: 'text', text: 'bar' },
            { type: 'element', name: 'baz', attributes: { baz: '42' }, children: [] },
          ],
        },
      ],
      t.required(Bar)
    );

    expect(element).toStrictEqual(
      Bar({
        attributes: { bar: 'bar' },
        content: ['bar', Baz({ attributes: { baz: 42 } })],
      })
    );
  });

  it('parses nested elements missing data', () => {
    // In Bar's schema, Baz is a required content, but it's omitted from the raw data.
    const element = parse(
      [
        {
          type: 'element',
          name: 'bar',
          attributes: {},
          children: [],
        },
      ],
      t.required(Bar)
    );

    expect(element).toStrictEqual(
      Bar({
        attributes: { bar: 'bar' },
        content: ['', Baz()],
      })
    );
  });
});
