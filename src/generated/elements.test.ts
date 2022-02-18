import { XMLElement } from '../lib/schema';
import { Ctor } from '../lib/util';
import * as elements from './elements';

const getAccessors = (Element: Ctor<XMLElement>): Array<{ suffix: string; getter: string; setter: string }> => {
  return Object.getOwnPropertyNames(Element.prototype)
    .filter((name) => name.startsWith('get'))
    .map((name) => name.slice(3))
    .map((suffix) => ({ suffix, getter: `get${suffix}`, setter: `set${suffix}` }));
};

const getTypeGuards = (Element: Ctor<XMLElement>): Array<{ suffix: string; method: string }> => {
  return Object.getOwnPropertyNames(Element)
    .filter((name) => name.startsWith('is'))
    .map((name) => name.slice(2))
    .map((suffix) => ({ suffix, method: `is${suffix}` }));
};

describe('elements', () => {
  for (const Element of Object.values(elements)) {
    describe(Element.name, () => {
      it('can be instantiated without crashing', () => {
        expect(() => new Element()).not.toThrow();
      });

      const accessors = getAccessors(Element);
      if (accessors.length > 0) {
        it.each(accessors)('can get and set $suffix', (accessor) => {
          const element = new Element();
          const symbol = Symbol(accessor.suffix);

          (element as any)[accessor.setter](symbol);
          const value = (element as any)[accessor.getter]();

          expect(value).toBe(symbol);
        });
      }

      const typeGuards = getTypeGuards(Element);
      if (typeGuards.length > 0) {
        it.each(typeGuards)('refutes non $suffix', (typeGuard) => {
          const symbol = Symbol(typeGuard.suffix);
          const result = (Element as any)[typeGuard.method](symbol);
          expect(result).toBeFalse();
        });
      }
    });
  }
});
