import { t } from '.';
import * as factory from './factory';

describe('factory', () => {
  describe('element', () => {
    it('creates an element factory', () => {
      const Foo = factory.element('foo', { attributes: {}, content: t.none() });
      expect(Foo).toBeFunction();
    });

    it('allows methods to be defined on the element', () => {
      const Foo = factory.element(
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
