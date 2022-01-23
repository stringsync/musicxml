import { t } from '.';
import { Cursor } from '../util';
import { RawXMLElement, resolve } from './parse';
import * as xml from './xml';

describe('parse', () => {
  it('sandbox', async () => {
    const Baz = xml.element('baz', { attributes: { baz: t.int() }, content: [] }, {});
    const Bar = xml.element(
      'bar',
      {
        attributes: {
          bar: t.string(),
        },
        content: [t.string()],
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
        ],
      },
      {}
    );

    const elements: RawXMLElement[] = [
      {
        type: 'element',
        name: 'foo',
        attributes: { foo: 'foo' },
        children: [
          {
            type: 'element',
            name: 'bar',
            attributes: { bar: 'bar' },
            children: [{ type: 'text', text: 'hey now' }],
          },
          {
            type: 'element',
            name: 'baz',
            attributes: { baz: '111111' },
            children: [],
          },
          {
            type: 'element',
            name: 'bar',
            attributes: { bar: 'bar' },
            children: [{ type: 'text', text: 'you are an allstar' }],
          },
        ],
      },
    ];

    const foo = resolve(Cursor.from(elements), t.choices(Bar, Foo));

    expect(
      foo.content.map((c: any) =>
        Array.isArray(c) ? c.map((b) => (typeof b === 'object' ? b.name : b)) : c ? c.name : c
      )
    ).toStrictEqual({});
  });
});
