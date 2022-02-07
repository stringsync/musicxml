import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<numeral-alter>` element
 *
 * Parent element: `<numeral>`
 *
 * The `<numeral-alter>` element represents an alteration to the `<numeral-root>`, similar to the `<alter>` element for a `<pitch>`.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/numeral-alter/}
 */
export type NumeralAlter = ReturnType<typeof NumeralAlter>;

export const NumeralAlter = xml.element(
  'numeral-alter',
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
      ['default-x']: t.label({ label: 'default-x', value: t.optional(dataTypes.tenths()) }),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
       * staff. Positive y is up and negative y is down.
       *
       * This attribute provides higher-resolution positioning data than the placement attribute. Applications reading a
       * MusicXML file that can understand both attributes should generally rely on this attribute for its greater
       * accuracy.
       */
      ['default-y']: t.label({ label: 'default-y', value: t.optional(dataTypes.tenths()) }),

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
       * The location attribute indicates whether the alteration should appear to the left or the right of the
       * `<numeral-root>`. It is left if not specified.
       */
      location: t.optional(dataTypes.leftRight()),

      /**
       * Specifies whether or not to print an object. It is yes if not specified. It can be used to hide an alteration
       * in cases such as when the MusicXML encoding of a 6 or 7 `<numeral-root>` in a minor key requires an alteration
       * that is not displayed.
       */
      ['print-object']: t.optional(dataTypes.yesNo()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual
       * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
       * interpreted in the context of the <offset> element or directive attribute if those are present.
       */
      ['relative-x']: t.label({ label: 'relative-x', value: t.optional(dataTypes.tenths()) }),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual
       * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
       * interpreted in the context of the <offset> element or directive attribute if those are present.
       */
      ['relative-y']: t.label({ label: 'relative-y', value: t.optional(dataTypes.tenths()) }),

      /**
       * Indicates how the root should appear in a score if not using the element contents.
       */
      text: t.optional(dataTypes.token()),
    },
    content: [t.required(dataTypes.semitones())] as const,
  },
  {}
);
