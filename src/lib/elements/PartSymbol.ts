import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<part-symbol>` element
 *
 * Parent element: `<attributes>`
 *
 * The `<part-symbol>` element indicates how a symbol for a multi-staff part is indicated in the score; brace is the
 * default value.
 *
 * The top-staff and bottom-staff attributes are used when the brace does not extend across the entire part. For
 * example, in a 3-staff organ part, the top-staff will typically be 1 for the right hand, while the bottom-staff will
 * typically be 2 for the left hand. Staff 3 for the pedals is usually outside the brace. By default, the presence of a
 * `<part-symbol>` element that does not extend across the entire part also indicates a corresponding change in the
 * common barlines within a part.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/part-symbol/}
 */
export type PartSymbol = ReturnType<typeof PartSymbol>;

export const PartSymbol = xml.element(
  'part-symbol',
  {
    attributes: {
      /**
       * Specifies the bottom staff of the symbol when it does not extend across the entire part.
       */
      ['bottom-staff']: t.optional(dataTypes.staffNumber()),

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
       * Specifies the top staff of the symbol when it does not extend across the entire part.
       */
      ['top-staff']: t.optional(dataTypes.staffNumber()),
    },
    content: [t.required(dataTypes.groupSymbolValue())] as const,
  },
  {}
);
