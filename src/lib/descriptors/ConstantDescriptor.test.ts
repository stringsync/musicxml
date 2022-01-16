import { ConstantDescriptor } from './ConstantDescriptor';

describe('ConstantDescriptor', () => {
  const descriptor = new ConstantDescriptor('foo');

  describe('zero', () => {
    it('returns the value that was passed in', () => {
      expect(descriptor.zero()).toBe('foo');
    });
  });

  describe('decode', () => {
    it('returns the value the was passed in when matching', () => {
      expect(descriptor.decode('foo')).toBe('foo');
    });

    it('returns the value the was passed in when not matching', () => {
      expect(descriptor.decode('bar')).toBe('foo');
    });
  });

  describe('encode', () => {
    it('returns the value the was passed in when matching', () => {
      expect(descriptor.encode('foo')).toBe('foo');
    });

    it('returns the value the was passed in when not matching', () => {
      expect(descriptor.encode('bar')).toBe('foo');
    });
  });

  describe('errors', () => {
    it('returns an empty array when matching', () => {
      expect(descriptor.errors('foo')).toBeEmpty();
    });

    it('returns an empty array when not matching', () => {
      expect(descriptor.errors('bar')).toBeEmpty();
    });
  });
});
