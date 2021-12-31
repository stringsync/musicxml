import { t } from './t';
import * as xml from './xml';

describe('xml', () => {
  describe('element', () => {
    it('creates an element factory', () => {
      const Foo = xml.element('foo', { attributes: {}, content: [] as const }, {});

      expect(Foo).toBeFunction();
      expect(Foo).not.toThrow();
    });

    it('creates a nested element factory', () => {
      const Bar = xml.element('bar', { attributes: {}, content: [] }, {});
      const Foo = xml.element('foo', { attributes: {}, content: [t.optional(Bar)] as const }, {});

      expect(Foo).toBeFunction();
      expect(Foo).not.toThrow();

      // test husky config

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
      { name: 'ints', content: () => [t.int()], expectation: 0 },
      { name: 'floats', content: () => [t.float()], expectation: 0 },
      { name: 'string constants', content: () => [t.constant('hello')], expectation: 'hello' },
      { name: 'number constants', content: () => [t.constant(3.14)], expectation: 3.14 },
      { name: 'enumerable string choices', content: () => [t.oneOf('zero', 'one')], expectation: 'zero' },
      { name: 'enumerable number choices', content: () => [t.oneOf(0, 1)], expectation: 0 },
      { name: 'enumerable heterogenous choices', content: () => [t.oneOf(0, 'one')], expectation: 0 },
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
      const Baz = xml.element('baz', { attributes: {}, content: [t.oneOf('zero', 'one')] as const }, {});
      const Bar = xml.element('bar', { attributes: {}, content: [t.required(Baz)] as const }, {});
      const Foo = xml.element('foo', { attributes: {}, content: [t.oneOrMore(Bar)] as const }, {});

      const foo = Foo();

      expect(foo.content[0]).toStrictEqual([Bar()]);
      expect(foo.content[0][0].content[0]).toStrictEqual(Baz());
    });
  });
});
