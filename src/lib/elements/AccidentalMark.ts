import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<accidental-mark>` element
 *
 * Parent elements: `<notations>`, `<ornaments>`
 *
 * An `<accidental-mark>` element can be used as a separate notation or as part of an ornament. When used in an
 * ornament, position and placement are relative to the ornament, not relative to the note.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/accidental-mark/}
 */
export type AccidentalMark = ReturnType<typeof AccidentalMark>;

export const AccidentalMark = xml.element(
  'accidental-mark',
  {
    attributes: {
      bracket: t.optional(dataTypes.yesNo()),

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
       * Specifies whether or not parentheses are put around a symbol for an editorial indication. If not specified, it
       * is left to application defaults.
       */
      parentheses: t.optional(dataTypes.yesNo()),

      /**
       * Indicates whether something is above or below another element, such as a note or a notation.
       */
      placement: t.optional(dataTypes.aboveBelow()),

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
       * Specifies the symbol size to use for an editorial indication. If not specified, it is left to application
       * defaults.
       */
      size: t.optional(dataTypes.symbolSize()),

      /**
       * References a specific Standard Music Font Layout (SMuFL) accidental glyph. This is used both with the other
       * accidental value and for disambiguating cases where a single MusicXML accidental value could be represented by
       * multiple SMuFL glyphs.
       */
      smufl: t.optional(dataTypes.smuflAccidentalGlyphName()),
    },
    content: [t.required(dataTypes.accidentalValue())] as const,
  },
  {}
);
