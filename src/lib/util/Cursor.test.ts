import { Cursor } from './Cursor';

describe('Cursor', () => {
  describe('from', () => {
    it('initializes a cursor with a zero index', () => {
      const cursor = Cursor.from([]);
      expect(cursor.getIndex()).toBe(0);
    });

    it('initializes a cursor pointing to the zeroth element', () => {
      const s1 = Symbol('1');
      const s2 = Symbol('2');

      const cursor = Cursor.from([s1, s2]);

      expect(cursor.get()).toBe(s1);
    });
  });

  describe('dup', () => {
    it('copies a cursor', () => {
      const s1 = Symbol('1');
      const s2 = Symbol('2');
      const src = Cursor.from([s1, s2]);
      src.next();

      const dst = src.dup();

      expect(dst).not.toBe(src);
      expect(dst.getIndex()).toBe(src.getIndex());
      expect(dst.get()).toBe(src.get());
    });
  });

  describe('done', () => {
    it('returns true when past the end of the array', () => {
      const cursor = Cursor.from(['foo']);
      cursor.next();
      expect(cursor.done()).toBeTrue();
    });

    it('returns true for empty arrays', () => {
      const cursor = Cursor.from([]);
      expect(cursor.done()).toBeTrue();
    });

    it('returns false when not past the end of the array', () => {
      const cursor = Cursor.from(['foo']);
      expect(cursor.done()).toBeFalse();
    });

    it('returns false when at the end of the array', () => {
      const cursor = Cursor.from(['foo', 'bar']);
      cursor.next();
      expect(cursor.done()).toBeFalse();
    });
  });

  describe('next', () => {
    it('moves the cursor by 1', () => {
      const s1 = Symbol('1');
      const s2 = Symbol('2');
      const cursor = Cursor.from([s1, s2]);

      cursor.next();

      expect(cursor.get()).toBe(s2);
    });

    it('throws an error when the cursor is done', () => {
      const cursor = Cursor.from([]);

      expect(() => cursor.next()).toThrow();
    });
  });

  describe('get', () => {
    it('returns the element at the index', () => {
      const array = [Symbol('1'), Symbol('2')];
      const cursor = Cursor.from(array);
      cursor.next();

      expect(cursor.get()).toBe(array[cursor.getIndex()]);
    });

    it('throws an error when done', () => {
      const cursor = Cursor.from([]);
      expect(() => cursor.get()).toThrow();
    });
  });

  describe('getIndex', () => {
    it('returns the index of the cursor', () => {
      const cursor = Cursor.from(['foo', 'bar']);
      expect(cursor.getIndex()).toBe(0);

      cursor.next();
      expect(cursor.getIndex()).toBe(1);
    });
  });

  describe('sync', () => {
    it('moves a cursor index to the other one', () => {
      const array = [1, 2, 3];
      const cursor1 = Cursor.from(array);
      const cursor2 = Cursor.from(array);
      cursor1.next();
      cursor1.next();

      cursor2.sync(cursor1);

      expect(cursor2.getIndex()).toBe(cursor1.getIndex());
    });

    it('throws an error if the synced index is out of bounds', () => {
      const cursor1 = Cursor.from([1, 2, 3]);
      const cursor2 = Cursor.from([]);
      cursor1.next();

      expect(() => cursor2.sync(cursor1)).toThrow();
    });
  });
});
