import { Descriptor } from './types';

export class DateDescriptor implements Descriptor<Date, string> {
  zero(): Date {
    return new Date(1970, 0, 1, 0, 0, 0, 0);
  }

  decode(raw: string): Date {
    return new Date(raw);
  }

  encode(value: Date): string {
    return value.toISOString();
  }

  errors(value: Date): string[] {
    return [];
  }
}
