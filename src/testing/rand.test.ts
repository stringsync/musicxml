import { MusicXMLElement } from '../lib/elements/MusicXMLElement';
import * as rand from './rand';

describe('rand', () => {
  describe('str', () => {
    it('returns a string of length', () => {
      const str = rand.str(3);
      expect(str).toHaveLength(3);
    });
  });

  describe('int', () => {
    it('returns an integer between min and max', () => {
      const int = rand.int(1, 3);
      expect(int).toBeInteger();
      expect(int).toBeGreaterThanOrEqual(1);
      expect(int).toBeLessThanOrEqual(3);
    });

    it('throws an error when min > max', () => {
      expect(() => rand.int(2, 1)).toThrowError();
    });
  });

  describe('elements.*', () => {
    it.each<[string, () => MusicXMLElement]>([
      ['scorePartwise', rand.scorePartwise],
      ['work', rand.work],
      ['movementNumber', rand.movementNumber],
      ['movementTitle', rand.movementTitle],
      ['identification', rand.identification],
      ['defaults', rand.defaults],
      ['credit', rand.credit],
      ['partList', rand.partList],
      ['part', rand.part],
    ])('creates a valid object for %s', (_, createElement) => {
      const element = createElement();
      expect(() => element.validate()).not.toThrow();
    });
  });
});
