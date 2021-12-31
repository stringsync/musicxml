import { t } from './t';
import * as xml from './xml';

describe('xml', () => {
  describe('element', () => {
    it('creates an element xml', () => {
      const Foo = xml.element('foo', { attributes: {}, content: t.none() });
      expect(Foo).toBeFunction();
    });

    it('creates elements with attributes', () => {
      const Foo = xml.element('foo', {
        attributes: {
          bar: t.string(),
        },
        content: t.none(),
      });

      const foo = Foo();

      expect(foo.attributes).toStrictEqual({ bar: '' });
    });

    it('creates elements with content', () => {
      const Foo = xml.element('foo', {
        attributes: {},
        content: t.string(),
      });

      const foo = Foo();

      expect(foo.content).toBe('');
    });

    it('creates elements with nested content', () => {
      const Foo = xml.element('foo', {
        attributes: {},
        content: t.string(),
      });
      const Bar = xml.element('bar', {
        attributes: {},
        content: Foo,
      });

      const bar = Bar();

      expect(bar.content.name).toBe('foo');
      expect(bar.content.content).toBe('');
    });

    it('creates elements with methods', () => {
      const Foo = xml.element(
        'foo',
        { attributes: {}, content: t.none() },
        {
          self() {
            return this;
          },
        }
      );

      const foo = Foo();

      expect(foo.self()).toBe(foo);
    });
  });
});
