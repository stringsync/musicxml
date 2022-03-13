import { LabelDescriptor } from '.';
import { MusicXMLError } from '../../MusicXMLError';
import {
  ChoicesDescriptor,
  CommentDescriptor,
  ConstantDescriptor,
  DateDescriptor,
  DescriptorChild,
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

export type LabelDescriptorOpts<T> = {
  label: string;
  value: T;
};

export type CommentDescriptorOpts<T> = {
  comment: string;
  value: T;
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
      throw new MusicXMLError('invalid zero value', { zero, pattern });
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
      throw new MusicXMLError('invalid min value', { min });
    }

    if (Number.isFinite(max) && (!Number.isInteger(max) || isNaN(max))) {
      throw new MusicXMLError('invalid max value', { max });
    }

    if (min >= max) {
      throw new MusicXMLError('invalid min and max values', { min, max });
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
      throw new MusicXMLError('invalid min value', { min });
    }

    if (isNaN(max)) {
      throw new MusicXMLError('invalid max value', { max });
    }

    if (min >= max) {
      throw new MusicXMLError('invalid min and max values', { min, max });
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

  static optional<T extends DescriptorChild>(value: T): OptionalDescriptor<T> {
    return {
      type: 'optional',
      value,
    };
  }

  static required<T extends DescriptorChild>(value: T): RequiredDescriptor<T> {
    return {
      type: 'required',
      value,
    };
  }

  static label<T>(opts: LabelDescriptorOpts<T>): LabelDescriptor<T> {
    return {
      type: 'label',
      label: opts.label,
      value: opts.value,
    };
  }

  static comment<T>(opts: CommentDescriptorOpts<T>): CommentDescriptor<T> {
    return {
      type: 'comment',
      comment: opts.comment,
      value: opts.value,
    };
  }

  static zeroOrMore<T extends DescriptorChild>(value: T): ZeroOrMoreDescriptor<T> {
    return {
      type: 'zeroOrMore',
      value,
    };
  }

  static oneOrMore<T extends DescriptorChild>(value: T): OneOrMoreDescriptor<T> {
    return {
      type: 'oneOrMore',
      value,
    };
  }

  static not<I extends DescriptorChild, E extends DescriptorChild>(opts: NotDescriptorOpts<I, E>): NotDescriptor<I, E> {
    return {
      type: 'not',
      include: opts.include,
      exclude: opts.exclude,
    };
  }

  private constructor() {
    throw new MusicXMLError('t is not instantiable');
  }
}
