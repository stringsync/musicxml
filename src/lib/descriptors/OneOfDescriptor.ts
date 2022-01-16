import { Descriptor } from './types';

export class OneOf<C extends Descriptor> implements Descriptor<C, string> {
  constructor(private child: C) {}

  zero(): C {
    return this.child.zero();
  }

  decode(raw: string): C {
    return this.child.decode(raw);
  }

  encode(value: C): string {
    return this.child.encode(value);
  }

  errors(value: C): string[] {
    return this.child.errors(value);
  }
}
