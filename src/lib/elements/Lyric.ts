import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { Elision } from './Elision';
import { EndLine } from './EndLine';
import { EndParagraph } from './EndParagraph';
import { Extend } from './Extend';
import { Footnote } from './Footnote';
import { Humming } from './Humming';
import { Laughing } from './Laughing';
import { Level } from './Level';
import { Syllabic } from './Syllabic';
import { Text } from './Text';

/**
 * The `<lyric>` element
 *
 * Parent element: `<note>`
 *
 * The `<lyric>` element represents text underlays for lyrics. Two `<text>` elements that are not separated by an
 * `<elision>` element are part of the same syllable, but may have different text formatting. A second `<syllabic>`
 * element is not allowed unless preceded by an `<elision>` element.
 *
 * If not otherwise specified:
 *
 * - The justify value is center.
 * - The placement value is below.
 * - The valign value is baseline.
 * - The halign value matches the justify value.
 *
 * The print-object attribute can override a `<note>`'s print-lyric attribute in cases where only some lyrics on a note
 * are printed, as when lyrics for later verses are printed in a block of text rather than with each note.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/lyric/}
 */
export type Lyric = ReturnType<typeof Lyric>;

export const Lyric = xml.element(
  'lyric',
  {
    attributes: {
      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

      /**
       * Changes the computation of the default horizontal position. If the parent is a `<notehead-text>` element, the
       * origin is changed relative to the left-hand side of the note or the musical position within the bar. Otherwise,
       * the origin is changed relative to the start of the first measure on the system, and these values are used when
       * the current measure or a succeeding measure starts a new system. Positive x is right and negative x is left.
       */
      ['default-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
       * staff. Positive y is up and negative y is down.
       */
      ['default-y']: t.optional(dataTypes.tenths()),

      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

      /**
       * Indicates left, center, or right justification. The default value varies for different elements. For elements
       * where the justify attribute is present but the halign attribute is not, the justify attribute indicates
       * horizontal alignment as well as justification.
       */
      justify: t.optional(dataTypes.leftCenterRight()),

      /**
       * Indicates the name of the lyric type. Common examples are verse and chorus.
       */
      name: t.optional(dataTypes.token()),

      /**
       * Specifies the lyric line when multiple lines are present.
       */
      number: t.optional(dataTypes.nmtoken()),

      /**
       * Indicates whether something is above or below another element, such as a note or a notation.
       */
      placement: t.optional(dataTypes.aboveBelow()),

      /**
       * Specifies whether or not to print an object. It is yes if not specified.
       */
      ['print-object']: t.optional(dataTypes.yesNo()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-x attribute. Positive x is right and negative x is left.
       */
      ['relative-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the vertical position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-y attribute. Positive y is up and negative y is down.
       */
      ['relative-y']: t.optional(dataTypes.tenths()),

      /**
       * Specifies which lyrics are to be sung which times through a repeated section.
       */
      ['time-only']: t.optional(dataTypes.timeOnly()),
    },
    content: [
      t.label({
        label: 'lyric',
        value: t.choices(
          [
            t.optional(Syllabic),
            t.required(Text),
            t.zeroOrMore([t.optional([t.required(Elision), t.optional(Syllabic)]), t.required(Text)]),
          ],
          Extend,
          Laughing,
          Humming
        ),
      }),
      t.optional(EndLine),
      t.optional(EndParagraph),
      t.optional(Footnote),
      t.optional(Level),
    ] as const,
  },
  {}
);
