import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<measure-numbering>` element
 *
 * Parent element: `<print>`
 *
 * The `<measure-numbering>` element describes how frequently measure numbers are displayed on this part. The text
 * attribute from the `<measure>` element is used for display, or the number attribute if the text attribute is not
 * present. Measures with an implicit attribute set to yes never display a measure number, regardless of the
 * `<measure-numbering>` setting.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/measure-numbering/}
 */
export type MeasureNumbering = ReturnType<typeof MeasureNumbering>;

export const MeasureNumbering = xml.element(
  'measure-numbering',
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
       * The multiple-rest-always and multiple-rest-range attributes describe how measure numbers are shown on multiple
       * rests when the `<measure-numbering>` value is not set to none. The multiple-rest-always attribute is set to yes
       * when the measure number should always be shown, even if the multiple rest starts midway through a system when
       * measure numbering is set to system level.
       */
      ['multiple-rest-always']: t.optional(dataTypes.yesNo()),

      /**
       * The multiple-rest-always and multiple-rest-range attributes describe how measure numbers are shown on multiple
       * rests when the `<measure-numbering>` value is not set to none. The multiple-rest-range attribute is set to yes
       * when measure numbers on multiple rests display the range of numbers for the first and last measure, rather than
       * just the number of the first measure.
       */
      ['multiple-rest-range']: t.optional(dataTypes.yesNo()),

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
       * Refers to staff numbers within the part, from top to bottom on the system. It indicates which staff is used as
       * the reference point for vertical positioning. A value of 1 is assumed if not present.
       */
      staff: t.optional(dataTypes.staffNumber()),

      /**
       * Specifies if measure numbers are associated with a system rather than the particular part where the
       * `<measure-numbering>` element appears.
       */
      system: t.optional(dataTypes.systemRelationNumber()),

      /**
       * Indicates vertical alignment to the top, middle, bottom, or baseline of the text. The default is
       * implementation-dependent.
       */
      valign: t.optional(dataTypes.valign()),
    },
    content: [t.required(dataTypes.measureNumberValue())] as const,
  },
  {}
);
