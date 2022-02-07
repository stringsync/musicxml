import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<part-abbreviation>` element
 *
 * Parent element: `<score-part>`
 *
 * The `<part-name>` and `<part-abbreviation>` elements describe the name and abbreviation of a `<score-part>` element,
 * respectively. Formatting attributes for these elements were deprecated in Version 2.0 in favor of the
 * `<part-name-display>` and `<part-abbreviation-display>` elements.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/part-abbreviation/}
 */
export type PartAbbreviation = ReturnType<typeof PartAbbreviation>;

export const PartAbbreviation = xml.element(
  'part-abbreviation',
  {
    attributes: {
      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

      /**
       * Changes the computation of the default horizontal position. The origin is changed relative to the left-hand
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
       * Indicates left, center, or right justification. The default value varies for different elements. For elements
       * where the justify attribute is present but the halign attribute is not, the justify attribute indicates
       * horizontal alignment as well as justification.
       */
      justify: t.optional(dataTypes.leftCenterRight()),

      /**
       * Specifies whether or not to print an object. It is yes if not specified.
       */
      ['print-object']: t.optional(dataTypes.yesNo()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-x attribute. Positive x is right and negative x is left.
       */
      ['relative-x']: t.label({ label: 'relative-x', value: t.optional(dataTypes.tenths()) }),

      /**
       * Changes the vertical position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-y attribute. Positive y is up and negative y is down.
       */
      ['relative-y']: t.label({ label: 'relative-y', value: t.optional(dataTypes.tenths()) }),
    },
    content: [t.required(dataTypes.string())] as const,
  },
  {}
);
