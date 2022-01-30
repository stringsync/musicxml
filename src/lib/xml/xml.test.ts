import { t } from './t';
import * as xml from './xml';

describe('xml', () => {
  describe('element', () => {
    it('creates an element factory', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [] as const }, {});

      expect(Foo).toBeFunction();
      expect(Foo).not.toThrow();
    });

    it('assigns the function name as the camelcase element name', () => {
      const Foo = xml.element('foo-bar', { attributes: {}, content: [] as const }, {});

      expect(Foo.name).toBe('FooBar');
    });

    it('assigns the element name to the function', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [] as const }, {});

      expect(Foo.elementName).toBe('foo');
    });

    it('assigns the schema to the function', () => {
      const schema = { attributes: {}, content: [] as const };
      const Foo = xml.element('foo', schema, {});

      expect(Foo.schema).toBe(schema);
    });

    it('creates a factory that can initialize attributes', () => {
      const Foo = xml.element('foo', { attributes: { bar: t.string() }, content: [] as const }, {});

      const foo = Foo({ attributes: { bar: 'hello' } });

      expect(foo.attributes.bar).toBe('hello');
    });

    it('creates a factory that can initialize content', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.string()] as const }, {});

      const foo = Foo({ content: ['hello'] });

      expect(foo.content[0]).toBe('hello');
    });

    it('creates a nested element factory', () => {
      const Bar = xml.element('bar', { attributes: {}, content: [] }, {});
      const Foo = xml.element('foo', { attributes: {}, content: [t.optional(Bar)] as const }, {});

      expect(Foo).toBeFunction();
      expect(Foo).not.toThrow();

      expect(Bar).toBeFunction();
      expect(Bar).not.toThrow();
    });

    it('creates a nested element factory with functions', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [t.optional(() => Bar)] as const }, {});
      const Bar = xml.element('bar', { attributes: {}, content: [] as const }, {});

      expect(Foo).toBeFunction();
      expect(Foo).not.toThrow();

      expect(Bar).toBeFunction();
      expect(Bar).not.toThrow();
    });

    it.each<{ name: string; content: () => any[]; expectation: any }>([
      { name: 'empty arrays', content: () => [], expectation: undefined },
      { name: 'strings', content: () => [t.string()], expectation: '' },
      {
        name: 'regexes',
        content: () => [t.regex({ pattern: /#[\dA-F]{6}([\dA-F][\dA-F])?/, zero: '#000000' })],
        expectation: '#000000',
      },
      { name: 'ints', content: () => [t.int()], expectation: 0 },
      { name: 'floats', content: () => [t.float()], expectation: 0 },
      { name: 'ranges', content: () => [t.int({ min: 200, max: 300 })], expectation: 200 },
      { name: 'string constants', content: () => [t.constant('hello')], expectation: 'hello' },
      { name: 'number constants', content: () => [t.constant(3.14)], expectation: 3.14 },
      { name: 'string choices', content: () => [t.choices('zero', 'one')], expectation: 'zero' },
      { name: 'number choices', content: () => [t.choices(0, 1)], expectation: 0 },
      { name: 'heterogenous choices', content: () => [t.choices(0, 'one')], expectation: 0 },
      { name: 'complex choices', content: () => [t.choices([t.string(), t.int()], [t.int()])], expectation: ['', 0] },
      { name: 'optional string values', content: () => [t.optional(t.string())], expectation: null },
      { name: 'optional number values', content: () => [t.optional(t.int())], expectation: null },
      { name: 'required string values', content: () => [t.required(t.string())], expectation: '' },
      { name: 'required number values', content: () => [t.required(t.int())], expectation: 0 },
      { name: 'zeroOrMore string values', content: () => [t.zeroOrMore(t.string())], expectation: [] },
      { name: 'zeroOrMore number values', content: () => [t.zeroOrMore(t.int())], expectation: [] },
      { name: 'oneOrMore string values', content: () => [t.oneOrMore(t.string())], expectation: [''] },
      { name: 'oneOrMore number values', content: () => [t.oneOrMore(t.int())], expectation: [0] },
    ])('returns zero values for simple types of $name', (t) => {
      const Foo = xml.element('foo', { attributes: {}, content: t.content() }, {});
      const foo = Foo();
      expect(foo.content[0]).toStrictEqual(t.expectation);
    });

    it('returns zero values for nested types', () => {
      const Bar = xml.element('bar', { attributes: {}, content: [] as const }, {});
      const Foo = xml.element('foo', { attributes: {}, content: [t.oneOrMore(Bar)] as const }, {});

      const foo = Foo();

      expect(foo.content[0]).toStrictEqual([Bar()]);
      expect(foo.content[0][0].content).toStrictEqual([]);
    });

    it('returns zero values for complex deeply nested types', () => {
      const Baz = xml.element('baz', { attributes: {}, content: [t.choices('zero', 'one')] as const }, {});
      const Bar = xml.element('bar', { attributes: {}, content: [t.required(Baz)] as const }, {});
      const Foo = xml.element('foo', { attributes: {}, content: [t.oneOrMore(Bar)] as const }, {});

      const foo = Foo();

      expect(foo.content[0]).toStrictEqual([Bar()]);
      expect(foo.content[0][0].content[0]).toStrictEqual(Baz());
    });
  });
});
