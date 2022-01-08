import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<text>` element
 *
 * Parent element: `<lyric>`
 *
 * The `<text>` element represents a syllable or portion of a syllable for lyric text underlay. A hyphen in the element
 * content should only be used for an actual hyphenated word.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/text/}
 */
export type Text = ReturnType<typeof Text>;

export const Text = xml.element(
  'text',
  {
    attributes: {
      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

      /**
       * The text-direction attribute is used to adjust and override the Unicode bidirectional text algorithm, similar
       * to the Directionality data category in
       * [the W3C Internationalization Tag Set recommendation.](https://www.w3.org/TR/2007/REC-its-20070403/#directionality)
       * The default value is ltr. This attribute is typically used by applications that store text in left-to-right
       * visual order rather than logical order. Such applications can use the lro value to better communicate with
       * other applications that more fully support bidirectional text.
       */
      dir: t.optional(dataTypes.textDirection()),

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
       * Specifies text tracking. Values are either normal, which allows flexibility of letter-spacing for purposes of
       * text justification. or a number representing the number of ems to add between each letter. The number may be
       * negative in order to subtract space. The value is normal if not specified.
       */
      ['letter-spacing']: t.optional(dataTypes.numberOrNormal()),

      /**
       * Number of lines to use when striking through text.
       */
      ['line-through']: t.optional(dataTypes.numberOfLines()),

      /**
       * Number of lines to use when overlining text.
       */
      overline: t.optional(dataTypes.numberOfLines()),

      /**
       * Used to rotate text around the alignment point specified by the halign and valign attributes. Positive values
       * are clockwise rotations, while negative values are counter-clockwise rotations.
       */
      rotation: t.optional(dataTypes.rotationDegrees()),

      /**
       * Number of lines to use when underlining text.
       */
      underline: t.optional(dataTypes.numberOfLines()),

      /**
       * Specifies the language used in the element content.
       */
      ['xml:lang']: t.optional(dataTypes.xml.lang()),
    },
    content: [] as const,
  },
  {}
);
