import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { Duration } from './Duration';
import { Figure } from './Figure';
import { Footnote } from './Footnote';
import { Level } from './Level';

/**
 * The `<figured-bass>` element
 *
 * Parent elements: `<measure>` (partwise), `<part>` (timewise)
 *
 * The `<figured-bass>` element represents figured bass notation. A `<figured-bass>` element takes its position from the
 * first regular note (not a grace note or chord note) that follows in score order. The optional `<duration>` element is
 * used to indicate changes of figures under a note. Figures are ordered from top to bottom.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/figured-bass/}
 */
export type FiguredBass = ReturnType<typeof FiguredBass>;

export const FiguredBass = xml.element(
  'figured-bass',
  {
    attributes: {
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
       * In cases where text extends over more than one line, horizontal alignment and justify values can be different.
       * The most typical case is for credits, such as:
       *
       * Words and music by
       *   Pat Songwriter
       *
       * Typically this type of credit is aligned to the right, so that the position information refers to the
       * right-most part of the text. But in this example, the text is center-justified, not right-justified.
       *
       * The halign attribute is used in these situations. If it is not present, its value is the same as for the
       * justify attribute. For elements where a justify attribute is not allowed, the default is
       * implementation-dependent.
       */
      halign: t.optional(dataTypes.leftCenterRight()),

      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

      /**
       * Indicates if the entire figured bass is parenthesized. It is no if not present.
       */
      parentheses: t.optional(dataTypes.yesNo()),

      /**
       * Indicates whether something is above or below another element, such as a note or a notation.
       */
      placement: t.optional(dataTypes.aboveBelow()),

      /**
       * Controls the printing of an augmentation dot separately from the rest of the note or rest. This is especially
       * useful for notes that overlap in different voices, or for chord sheets that contain lyrics and chords but no
       * melody. If print-object is set to no, this attribute is also interpreted as being set to no if not present.
       */
      ['print-dot']: t.optional(dataTypes.yesNo()),

      /**
       * Controls the printing of a lyric separately from the rest of the note or rest. This is especially useful for
       * notes that overlap in different voices, or for chord sheets that contain lyrics and chords but no melody. If
       * print-object is set to no, this attribute is also interpreted as being set to no if not present.
       */
      ['print-lyric']: t.optional(dataTypes.yesNo()),

      /**
       * Specifies whether or not to print an object. It is yes if not specified.
       */
      ['print-object']: t.optional(dataTypes.yesNo()),

      /**
       * Controls whether or not spacing is left for an invisible note or object. It is used only if no note, dot, or
       * lyric is being printed. The value is yes (leave spacing) if not specified.
       */
      ['print-spacing']: t.optional(dataTypes.yesNo()),

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
       * Indicates vertical alignment to the top, middle, bottom, or baseline of the text. The default is
       * implementation-dependent.
       */
      valign: t.optional(dataTypes.valign()),
    },
    content: [
      t.label({ label: 'figures', value: t.oneOrMore(Figure) }),
      t.optional(Duration),
      t.optional(Footnote),
      t.optional(Level),
    ] as const,
  },
  {}
);
