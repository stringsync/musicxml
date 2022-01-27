import { parse } from './parse';
import { t } from './t';
import * as xml from './xml';

describe('parse', () => {
  describe('with optional descriptors', () => {
    it('returns a zero value when given no raw elements', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [] }, {});

      const result = parse([], t.optional(Foo));

      expect(result).toBeNull();
    });

    it('returns a zero value when given a mismatching raw element', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [] }, {});

      const result = parse([{ type: 'element', name: 'bar', attributes: {}, children: [] }], t.optional(Foo));

      expect(result).toBeNull();
    });

    it('returns a parsed value when given a matching raw element', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [{ type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'first' }] }],
        t.optional(Foo)
      );

      expect(result).toStrictEqual(Foo({ content: ['first'] }));
    });

    it('returns a single parsed value when given multiple raw matching elements', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'first' }] },
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'second' }] },
        ],
        t.optional(Foo)
      );

      expect(result).toStrictEqual(Foo({ content: ['first'] }));
    });

    it('returns a zero value when the first raw element mismatches', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [
          { type: 'element', name: 'bar', attributes: {}, children: [{ type: 'text', text: 'first' }] },
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'second' }] },
        ],
        t.optional(Foo)
      );

      expect(result).toBeNull();
    });
  });

  describe('with required descriptors', () => {
    it('returns a zero value when given no raw elements', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [] }, {});

      const result = parse([], t.required(Foo));

      expect(result).toStrictEqual(Foo());
    });

    it('returns a zero value when given a mismatching raw element', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [] }, {});

      const result = parse([{ type: 'element', name: 'bar', attributes: {}, children: [] }], t.required(Foo));

      expect(result).toStrictEqual(Foo());
    });

    it('returns a parsed value when given a matching raw element', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [{ type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'first' }] }],
        t.required(Foo)
      );

      expect(result).toStrictEqual(Foo({ content: ['first'] }));
    });

    it('returns a single parsed value when given multiple raw matching elements', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'first' }] },
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'second' }] },
        ],
        t.required(Foo)
      );

      expect(result).toStrictEqual(Foo({ content: ['first'] }));
    });

    it('returns a zero value when the first raw element mismatches', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [
          { type: 'element', name: 'bar', attributes: {}, children: [{ type: 'text', text: 'first' }] },
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'second' }] },
        ],
        t.required(Foo)
      );

      expect(result).toStrictEqual(Foo());
    });
  });

  describe('with constant descriptors', () => {
    it('returns the constant when given no raw elements', () => {
      const result = parse([], t.constant('foo'));

      expect(result).toBe('foo');
    });

    it('returns the constant when given a mismatching raw element', () => {
      const result = parse([{ type: 'text', text: 'bar' }], t.constant('foo'));

      expect(result).toBe('foo');
    });

    it('returns the constant when given a matching raw element', () => {
      const result = parse([{ type: 'text', text: 'foo' }], t.constant('foo'));

      expect(result).toBe('foo');
    });

    it('returns the constant value when given multiple raw matching elements', () => {
      const result = parse(
        [
          { type: 'text', text: 'foo' },
          { type: 'text', text: 'foo' },
        ],
        t.constant('foo')
      );

      expect(result).toBe('foo');
    });

    it('returns the constant when the first raw element mismatches', () => {
      const result = parse(
        [
          { type: 'text', text: 'bar' },
          { type: 'text', text: 'foo' },
        ],
        t.constant('foo')
      );

      expect(result).toBe('foo');
    });
  });

  describe('with string descriptors', () => {
    it('returns a zero value when given no raw elements', () => {
      const result = parse([], t.string());

      expect(result).toBe('');
    });

    it('returns a parsed value when given a matching raw element', () => {
      const result = parse([{ type: 'text', text: 'foo' }], t.string());

      expect(result).toBe('foo');
    });

    it('returns a single parsed value when given multiple raw matching elements', () => {
      const result = parse(
        [
          { type: 'text', text: 'first' },
          { type: 'text', text: 'second' },
        ],
        t.string()
      );

      expect(result).toBe('first');
    });
  });

  describe('with int descriptors', () => {
    it('returns a zero value when given no raw elements', () => {
      const result = parse([], t.int());

      expect(result).toBe(0);
    });

    it('returns a zero value when given a mismatching raw element', () => {
      const result = parse([{ type: 'text', text: 'foo' }], t.int());

      expect(result).toBe(0);
    });

    it('returns a parsed value when given a matching raw element', () => {
      const result = parse([{ type: 'text', text: '42' }], t.int());

      expect(result).toBe(42);
    });

    it('returns a single parsed value when given multiple raw matching elements', () => {
      const result = parse(
        [
          { type: 'text', text: '1' },
          { type: 'text', text: '2' },
        ],
        t.int()
      );

      expect(result).toBe(1);
    });

    it('returns a zero value when the first raw element mismatches', () => {
      const result = parse(
        [
          { type: 'text', text: 'foo' },
          { type: 'text', text: '2' },
        ],
        t.int()
      );

      expect(result).toBe(0);
    });
  });

  describe('with float descriptors', () => {
    it('returns a zero value when given no raw elements', () => {
      const result = parse([], t.float());

      expect(result).toBe(0);
    });

    it('returns a zero value when given a mismatching raw element', () => {
      const result = parse([{ type: 'text', text: 'foo' }], t.float());

      expect(result).toBe(0);
    });

    it('returns a parsed value when given a matching raw element', () => {
      const result = parse([{ type: 'text', text: '4.2' }], t.float());

      expect(result).toBe(4.2);
    });

    it('returns a single parsed value when given multiple raw matching elements', () => {
      const result = parse(
        [
          { type: 'text', text: '1.1' },
          { type: 'text', text: '2.2' },
        ],
        t.float()
      );

      expect(result).toBe(1.1);
    });

    it('returns a zero value when the first raw element mismatches', () => {
      const result = parse(
        [
          { type: 'text', text: 'foo' },
          { type: 'text', text: '2.2' },
        ],
        t.int()
      );

      expect(result).toBe(0);
    });
  });

  describe('with zeroOrMore descriptors', () => {
    it('returns a zero value when given no raw elements', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [] }, {});

      const result = parse([], t.zeroOrMore(Foo));

      expect(result).toStrictEqual([]);
    });

    it('returns a zero value when given a mismatching raw element', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [] }, {});

      const result = parse([{ type: 'element', name: 'bar', attributes: {}, children: [] }], t.zeroOrMore(Foo));

      expect(result).toStrictEqual([]);
    });

    it('returns a parsed value when given a matching raw element', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [] }, {});

      const result = parse([{ type: 'element', name: 'foo', attributes: {}, children: [] }], t.zeroOrMore(Foo));

      expect(result).toStrictEqual([Foo()]);
    });

    it('returns a multiple parsed values when given multiple raw matching elements', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'first' }] },
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'second' }] },
        ],
        t.zeroOrMore(Foo)
      );

      expect(result).toStrictEqual([Foo({ content: ['first'] }), Foo({ content: ['second'] })]);
    });

    it('returns a zero value when the first raw element mismatches', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [
          { type: 'element', name: 'bar', attributes: {}, children: [{ type: 'text', text: 'first' }] },
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'second' }] },
        ],
        t.zeroOrMore(Foo)
      );

      expect(result).toStrictEqual([]);
    });
  });

  describe('with oneOrMore descriptors', () => {
    it('returns a zero value when given no raw elements', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [] }, {});

      const result = parse([], t.oneOrMore(Foo));

      expect(result).toStrictEqual([Foo()]);
    });

    it('returns a zero value when given a mismatching raw element', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [] }, {});

      const result = parse([{ type: 'element', name: 'bar', attributes: {}, children: [] }], t.oneOrMore(Foo));

      expect(result).toStrictEqual([Foo()]);
    });

    it('returns a parsed value when given a matching raw element', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [{ type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'first' }] }],
        t.oneOrMore(Foo)
      );

      expect(result).toStrictEqual([Foo({ content: ['first'] })]);
    });

    it('returns a multiple parsed values when given multiple raw matching elements', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'first' }] },
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'second' }] },
        ],
        t.oneOrMore(Foo)
      );

      expect(result).toStrictEqual([Foo({ content: ['first'] }), Foo({ content: ['second'] })]);
    });

    it('returns a zero value when the first raw element mismatches', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [
          { type: 'element', name: 'bar', attributes: {}, children: [{ type: 'text', text: 'first' }] },
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'second' }] },
        ],
        t.oneOrMore(Foo)
      );

      expect(result).toStrictEqual([Foo()]);
    });
  });

  describe('with choice descriptors', () => {
    it('returns a zero value when given no raw elements', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [] }, {});
      const Bar = xml.element('bar', { attributes: {}, content: [] }, {});

      const result = parse([], t.choices(Foo, Bar));

      expect(result).toStrictEqual(Foo());
    });

    it('returns a zero value when given a mismatching raw element', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [] }, {});
      const Bar = xml.element('bar', { attributes: {}, content: [] }, {});

      const result = parse([{ type: 'element', name: 'baz', attributes: {}, children: [] }], t.choices(Foo, Bar));

      expect(result).toStrictEqual(Foo());
    });

    it('returns a parsed value when given a matching first raw element', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});
      const Bar = xml.element('bar', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [{ type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'first' }] }],
        t.choices(Foo, Bar)
      );

      expect(result).toStrictEqual(Foo({ content: ['first'] }));
    });

    it('returns a parsed value when given a matching first raw element', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});
      const Bar = xml.element('bar', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [{ type: 'element', name: 'bar', attributes: {}, children: [{ type: 'text', text: 'first' }] }],
        t.choices(Foo, Bar)
      );

      expect(result).toStrictEqual(Bar({ content: ['first'] }));
    });

    it('returns a single parsed value when given multiple raw matching elements', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});
      const Bar = xml.element('bar', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'first' }] },
          { type: 'element', name: 'bar', attributes: {}, children: [{ type: 'text', text: 'second' }] },
        ],
        t.choices(Foo, Bar)
      );

      expect(result).toStrictEqual(Foo({ content: ['first'] }));
    });

    it('returns a zero value when the first raw element mismatches', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});
      const Bar = xml.element('bar', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [
          { type: 'element', name: 'baz', attributes: {}, children: [{ type: 'text', text: 'first' }] },
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'second' }] },
        ],
        t.choices(Foo, Bar)
      );

      expect(result).toStrictEqual(Foo());
    });
  });

  describe('with descriptor arrays', () => {
    it('returns a zero value when given no raw elements', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [] }, {});
      const Bar = xml.element('bar', { attributes: {}, content: [] }, {});

      const result = parse([], [t.required(Foo), t.required(Bar)]);

      expect(result).toStrictEqual([Foo(), Bar()]);
    });

    it('returns a zero value when given mismatching raw elements', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});
      const Bar = xml.element('bar', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [
          { type: 'element', name: 'bar', attributes: {}, children: [{ type: 'text', text: 'first' }] },
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'second' }] },
        ],
        [t.required(Foo), t.required(Bar)]
      );

      expect(result).toStrictEqual([Foo(), Bar({ content: ['first'] })]);
    });

    it('returns a parsed value when given a matching raw element', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});
      const Bar = xml.element('bar', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'first' }] },
          { type: 'element', name: 'bar', attributes: {}, children: [{ type: 'text', text: 'second' }] },
        ],
        [t.required(Foo), t.required(Bar)]
      );

      expect(result).toStrictEqual([Foo({ content: ['first'] }), Bar({ content: ['second'] })]);
    });

    it('returns a single parsed value when given multiple raw matching elements', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});
      const Bar = xml.element('bar', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'first' }] },
          { type: 'element', name: 'bar', attributes: {}, children: [{ type: 'text', text: 'second' }] },
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'third' }] },
          { type: 'element', name: 'bar', attributes: {}, children: [{ type: 'text', text: 'fourth' }] },
        ],
        [t.required(Foo), t.required(Bar)]
      );

      expect(result).toStrictEqual([Foo({ content: ['first'] }), Bar({ content: ['second'] })]);
    });

    it('returns a zero value when the first raw element mismatches', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] }, {});
      const Bar = xml.element('bar', { attributes: {}, content: [t.string()] }, {});

      const result = parse(
        [
          { type: 'element', name: 'bar', attributes: {}, children: [{ type: 'text', text: 'second' }] },
          { type: 'element', name: 'foo', attributes: {}, children: [{ type: 'text', text: 'first' }] },
        ],
        [t.required(Foo), t.required(Bar)]
      );

      expect(result).toStrictEqual([Foo(), Bar({ content: ['second'] })]);
    });
  });

  describe('with complex descriptors', () => {
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
});
