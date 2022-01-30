import { MusicXMLError } from '../errors';
import {
  Child,
  ChoicesDescriptor,
  ConstantDescriptor,
  DateDescriptor,
  FloatDescriptor,
  IntDescriptor,
  NotDescriptor,
  OneOrMoreDescriptor,
  OptionalDescriptor,
  RegexDescriptor,
  RequiredDescriptor,
  StringDescriptor,
  ZeroOrMoreDescriptor,
} from './types';

export type RegexDescriptorOpts = {
  pattern: RegExp;
  zero: string;
};

export type NumberDescriptorOpts = {
  min?: number;
  max?: number;
};

export type NotDescriptorOpts<I, E> = {
  include: I;
  exclude: E;
};

export class t {
  static string(): StringDescriptor {
    return {
      type: 'string',
    };
  }

  static regex(opts: RegexDescriptorOpts): RegexDescriptor {
    const { zero, pattern } = opts;

    if (!zero.match(pattern)) {
      throw new MusicXMLError({
        symptom: 'invalid zero value',
        context: { zero, pattern },
        remedy: 'use a different zero value or pattern',
      });
    }

    return {
      type: 'regex',
      pattern,
      zero,
    };
  }

  static int(opts?: NumberDescriptorOpts): IntDescriptor {
    const min = opts?.min ?? Number.NEGATIVE_INFINITY;
    const max = opts?.max ?? Number.POSITIVE_INFINITY;

    if (Number.isFinite(min) && (!Number.isInteger(min) || isNaN(min))) {
      throw new MusicXMLError({
        symptom: 'invalid min value',
        context: { min },
        remedy: 'min must be an integer',
      });
    }

    if (Number.isFinite(max) && (!Number.isInteger(max) || isNaN(max))) {
      throw new MusicXMLError({
        symptom: 'invalid max value',
        context: { max },
        remedy: 'max must be an integer',
      });
    }

    if (min >= max) {
      throw new MusicXMLError({
        symptom: 'invalid min and max values',
        context: { min, max },
        remedy: 'min must be strictly less than max',
      });
    }

    return {
      type: 'int',
      min,
      max,
    };
  }

  static float(opts?: NumberDescriptorOpts): FloatDescriptor {
    const min = opts?.min ?? Number.NEGATIVE_INFINITY;
    const max = opts?.max ?? Number.POSITIVE_INFINITY;

    if (isNaN(min)) {
      throw new MusicXMLError({
        symptom: 'invalid min value',
        context: { min },
        remedy: 'min must be a number',
      });
    }

    if (isNaN(max)) {
      throw new MusicXMLError({
        symptom: 'invalid max value',
        context: { max },
        remedy: 'max must be a number',
      });
    }

    if (min >= max) {
      throw new MusicXMLError({
        symptom: 'invalid min and max values',
        context: { min, max },
        remedy: 'min must be strictly less than max',
      });
    }

    return {
      type: 'float',
      min,
      max,
    };
  }

  static date(): DateDescriptor {
    return {
      type: 'date',
    };
  }

  static constant<T extends number | string>(value: T): ConstantDescriptor<T> {
    return {
      type: 'constant',
      value,
    };
  }

  static choices<T extends [any, ...any[]]>(...choices: T): ChoicesDescriptor<T> {
    return {
      type: 'choices',
      choices,
    };
  }

  static optional<T extends Child>(value: T): OptionalDescriptor<T> {
    return {
      type: 'optional',
      value,
    };
  }

  static required<T extends Child>(value: T): RequiredDescriptor<T> {
    return {
      type: 'required',
      value,
    };
  }

  static zeroOrMore<T extends Child>(value: T): ZeroOrMoreDescriptor<T> {
    return {
      type: 'zeroOrMore',
      value,
    };
  }

  static oneOrMore<T extends Child>(value: T): OneOrMoreDescriptor<T> {
    return {
      type: 'oneOrMore',
      value,
    };
  }

  static not<I extends Child, E extends Child>(opts: NotDescriptorOpts<I, E>): NotDescriptor<I, E> {
    return {
      type: 'not',
      include: opts.include,
      exclude: opts.exclude,
    };
  }

  private constructor() {
    throw new MusicXMLError({
      symptom: 't is not instantiable',
      context: {},
      remedy: 'do not instantiate t',
    });
  }
}
