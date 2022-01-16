import { DateDescriptor } from './DateDescriptor';

describe('DateDescriptor', () => {
  const descriptor = new DateDescriptor();

  describe('zero', () => {
    it('returns the beginning of EPOCH', () => {
      expect(descriptor.zero()).toStrictEqual(new Date(1970, 0, 1, 0, 0, 0, 0));
    });
  });

  describe('decode', () => {
    it('creates a new date from the string', () => {
      const str = '2022-01-01T00:00:00.000Z';
      expect(descriptor.decode(str)).toStrictEqual(new Date(str));
    });
  });

  describe('encode', () => {
    it('converts a date to its ISO representation', () => {
      const str = '2022-01-01T00:00:00.000Z';
      expect(descriptor.encode(new Date(str))).toBe(str);
    });
  });

  describe('errors', () => {
    it('returns an empty array', () => {
      expect(descriptor.errors(new Date())).toBeEmpty();
    });
  });
});
