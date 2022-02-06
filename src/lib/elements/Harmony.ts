import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { Bass } from './Bass';
import { Degree } from './Degree';
import { Footnote } from './Footnote';
import { Frame } from './Frame';
import { Function } from './Function';
import { Inversion } from './Inversion';
import { Kind } from './Kind';
import { Level } from './Level';
import { Numeral } from './Numeral';
import { Offset } from './Offset';
import { Root } from './Root';
import { Staff } from './Staff';

/**
 * The `<harmony>` element
 *
 * Parent elements: `<measure>` (partwise), `<part>` (timewise)
 *
 * The `<harmony>` element represents harmony analysis, including chord symbols in popular music as well as functional
 * harmony analysis in classical music.
 *
 * The print-object attribute controls whether or not anything is printed due to the `<harmony>` element. The print
 * suggestion attributes set the defaults for the harmony, but individual elements can override this with their own
 * values.
 *
 * A `<harmony>` element can contain many stacked chords (e.g. V of II). Each individual chord including a required
 * `<kind>` element is referred to as a harmony-chord. Stacked chords or secondary functions are represented using a
 * sequence of harmony-chords. For example, V of II would be represented by a harmony-chord with a 5 numeral followed by
 * a harmony-chord with a 2 numeral.
 *
 * A `<root>` is a pitch name like C, D, E, while a `<numeral>` is a scale degree like 1, 2, 3. The `<root>` element is
 * generally used with pop chord symbols, while the `<numeral>` element is generally used with classical functional
 * harmony and Nashville numbers. It is an either/or choice to avoid data inconsistency. The `<function>` element, which
 * represents Roman numerals with roman numeral text, has been deprecated as of MusicXML 4.0.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/harmony/}
 */
export type Harmony = ReturnType<typeof Harmony>;

export const Harmony = xml.element(
  'harmony',
  {
    attributes: {
      /**
       * Specifies how multiple harmony-chords are arranged relative to each other. Harmony-chords with vertical
       * arrangement are separated by horizontal lines. Harmony-chords with diagonal or horizontal arrangement are
       * separated by diagonal lines or slashes.
       */
      arrangement: t.optional(dataTypes.harmonyArrangement()),

      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

      /**
       * 	Changes the computation of the default horizontal position. The origin is changed relative to the left-hand
       * side of the note or the musical position within the bar. Positive x is right and negative x is left.
       *
       * This attribute provides higher-resolution positioning data than the `<offset>` element. Applications reading a
       * MusicXML file that can understand both features should generally rely on this attribute for its greater
       * accuracy.
       */
      ['default-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
       * staff. Positive y is up and negative y is down.
       *
       * This attribute provides higher-resolution positioning data than the placement attribute. Applications reading a
       * MusicXML file that can understand both attributes should generally rely on this attribute for its greater
       * accuracy.
       */
      ['default-y']: t.optional(dataTypes.tenths()),

      /**
       * A comma-separated list of font names.
       */
      ['font-family']: t.optional(dataTypes.fontFamily()),

      /**
       * One of the CSS sizes or a numeric point size.
       */
      ['font-size']: t.optional(dataTypes.fontSize()),

      /**
       * Normal or italic style.
       */
      ['font-style']: t.optional(dataTypes.fontStyle()),

      /**
       * Normal or bold weight.
       */
      ['font-weight']: t.optional(dataTypes.fontWeight()),

      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

      /**
       * Indicates whether something is above or below another element, such as a note or a notation.
       */
      placement: t.optional(dataTypes.aboveBelow()),

      /**
       * Specifies the printing of a frame or fretboard diagram.
       */
      ['print-frame']: t.optional(dataTypes.yesNo()),

      /**
       * Specifies whether or not to print an object. It is yes if not specified.
       */
      ['print-object']: t.optional(dataTypes.yesNo()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual
       * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
       * interpreted in the context of the <offset> element or directive attribute if those are present.
       */
      ['relative-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual
       * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
       * interpreted in the context of the <offset> element or directive attribute if those are present.
       */
      ['relative-y']: t.optional(dataTypes.tenths()),

      /**
       * Distinguishes elements that are associated with a system rather than the particular part where the element
       * appears.
       */
      system: t.optional(dataTypes.systemRelation()),

      /**
       * If there are alternate harmonies possible, this can be specified using multiple `<harmony>` elements
       * differentiated by type. Explicit harmonies have all note present in the music; implied have some notes missing
       * but implied; alternate represents alternate analyses.
       */
      type: t.optional(dataTypes.harmonyType()),
    },
    content: [
      t.label({
        label: 'harmony',
        value: t.oneOrMore([
          t.choices(Root, Numeral, Function),
          t.required(Kind),
          t.optional(Inversion),
          t.optional(Bass),
          t.zeroOrMore(Degree),
        ]),
      }),
      t.optional(Frame),
      t.optional(Offset),
      t.optional(Footnote),
      t.optional(Level),
      t.optional(Staff),
    ] as const,
  },
  {}
);
