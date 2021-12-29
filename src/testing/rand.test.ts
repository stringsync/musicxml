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
});
