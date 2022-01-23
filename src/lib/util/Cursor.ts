export class Cursor<T> {
  static from<T>(array: T[]) {
    return new Cursor([...array], 0);
  }

  private array: T[];
  private index: number;

  private constructor(array: T[], index: number) {
    this.array = array;
    this.index = index;
  }

  dup() {
    return new Cursor(this.array, this.index);
  }

  done() {
    return this.index >= this.array.length;
  }

  next() {
    if (this.done()) {
      throw new Error('the cursor is done');
    }
    this.index++;
  }

  get() {
    if (this.done()) {
      throw new Error('the cursor is done');
    }
    return this.array[this.index];
  }

  getIndex() {
    return this.index;
  }

  goto(index: number) {
    if (!Number.isInteger(index)) {
      throw new Error('index must be an integer');
    }
    if (index < 0) {
      throw new Error('index must be > 0');
    }
    if (index > this.array.length) {
      throw new Error(`index must be <= ${this.array.length}`);
    }
    this.index = index;
  }
}
