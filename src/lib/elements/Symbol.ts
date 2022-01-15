import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<symbol>` element
 *
 * Parent element: `<direction-type>`
 *
 * The `<symbol>` element specifies a musical symbol using a canonical SMuFL glyph name. It is used when an occasional
 * musical symbol is interspersed into text. It should not be used in place of semantic markup, such as metronome marks
 * that mix text and symbols. Left justification is used if not specified. Enclosure is none if not specified.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/direction-type/}
 */
export type Symbol = ReturnType<typeof Symbol>;

export const Symbol = xml.element(
  'symbol',
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
       * The text-direction attribute is used to adjust and override the Unicode bidirectional text algorithm, similar
       * to the Directionality data category in the
       * [W3C Internationalization Tag Set recommendation.](https://www.w3.org/TR/2007/REC-its-20070403/#directionality)
       * The default value is ltr. This attribute is typically used by applications that store text in left-to-right
       * visual order rather than logical order. Such applications can use the lro value to better communicate with
       * other applications that more fully support bidirectional text.
       */
      dir: t.optional(dataTypes.textDirection()),

      /**
       * Formatting of an enclosure around text or symbols.
       */
      enclosure: t.optional(dataTypes.enclosureShape()),

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
       * Indicates left, center, or right justification. The default value varies for different elements. For elements
       * where the justify attribute is present but the halign attribute is not, the justify attribute indicates
       * horizontal alignment as well as justification.
       */
      justify: t.optional(dataTypes.leftCenterRight()),

      /**
       * Specifies text tracking. Values are either normal, which allows flexibility of letter-spacing for purposes of
       * text justification. or a number representing the number of ems to add between each letter. The number may be
       * negative in order to subtract space. The value is normal if not specified.
       */
      ['letter-spacing']: t.optional(dataTypes.numberOrNormal()),

      /**
       * Specifies text leading. Values are either normal or a number representing the percentage of the current font
       * height to use for leading. It is normal if not specified. The exact normal value is implementation-dependent,
       * but values between 100 and 120 are recommended.
       */
      ['line-height']: t.optional(dataTypes.numberOrNormal()),

      /**
       * Number of lines to use when striking through text.
       */
      ['line-through']: t.optional(dataTypes.numberOfLines()),

      /**
       * Number of lines to use when overlining text.
       */
      overline: t.optional(dataTypes.numberOfLines()),

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
       * Used to rotate text around the alignment point specified by the halign and valign attributes. Positive values
       * are clockwise rotations, while negative values are counter-clockwise rotations.
       */
      rotation: t.optional(dataTypes.rotationDegrees()),

      /**
       * Number of lines to use when underlining text.
       */
      underline: t.optional(dataTypes.numberOfLines()),

      /**
       * Indicates vertical alignment to the top, middle, bottom, or baseline of the text. The default is
       * implementation-dependent.
       */
      valign: t.optional(dataTypes.valign()),
    },
    content: [] as const,
  },
  {}
);