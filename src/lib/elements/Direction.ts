import { t, xml } from '../xml';
import { DirectionType } from './DirectionType';
import { Footnote } from './Footnote';
import { Level } from './Level';
import { Listening } from './Listening';
import { Offset } from './Offset';
import { Sound } from './Sound';
import { Staff } from './Staff';
import { Voice } from './Voice';

/**
 * The `<direction>` element
 *
 * Parent elements: `<measure>` (partwise), `<part>` (timewise)
 *
 * A direction is a musical indication that is not necessarily attached to a specific note. Two or more may be combined
 * to indicate words followed by the start of a dashed line, the end of a wedge followed by dynamics, etc. For
 * applications where a specific direction is indeed attached to a specific note, the `<direction>` element can be
 * associated with the first `<note>` element that follows it in score order that is not in a different voice.
 *
 * By default, a series of `<direction-type>` elements and a series of child elements of a `<direction-type>` within a
 * single `<direction>` element follow one another in sequence visually. For a series of `<direction-type>` children,
 * non-positional formatting attributes are carried over from the previous element by default.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/direction/}
 */
export type Direction = ReturnType<typeof Direction>;

export const Direction = xml.element(
  'direction',
  {
    attributes: {},
    content: [
      t.oneOrMore(DirectionType),
      t.optional(Offset),
      t.optional(Footnote),
      t.optional(Level),
      t.optional(Voice),
      t.optional(Staff),
      t.optional(Sound),
      t.optional(Listening),
    ] as const,
  },
  {}
);
