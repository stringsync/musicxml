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
        bar: t.string(),
      },
      content: [t.string(), t.optional(Baz)] as const,
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

  it('parses with array descriptors', () => {
    const elements = parse([], [t.optional(Foo)]);
    expect(elements).toStrictEqual([null]);
  });

  it('parses using the raw elements', () => {
    const element = parse(
      [
        {
          type: 'element',
          name: Baz.elementName,
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
    const element = parse(
      [
        {
          type: 'element',
          name: Baz.elementName,
          attributes: { baz: '42' },
          children: [{ type: 'text', text: 'baz' }],
        },
        {
          type: 'element',
          name: Baz.elementName,
          attributes: { baz: '84' },
          children: [{ type: 'text', text: 'bazbaz' }],
        },
      ],
      t.zeroOrMore(Baz)
    );

    expect(element).toStrictEqual([
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
});
