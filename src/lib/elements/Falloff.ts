import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<falloff>` element
 *
 * Parent element: `<articulations>`
 *
 * The `<falloff>` element is an indeterminate slide attached to a single note. The falloff appears after the main note
 * and goes below the main pitch.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/falloff/}
 */
export type Falloff = ReturnType<typeof Falloff>;

export const Falloff = xml.element(
  'falloff',
  {
    attributes: {
      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

      /**
       * The length of dashes in a dashed line. Ignored if the corresponding line-type attribute is not dashed.
       */
      ['dash-length']: t.optional(dataTypes.tenths()),

      /**
       * Changes the computation of the default horizontal position. If the parent is a `<notehead-text>` element, the
       * origin is changed relative to the left-hand side of the note or the musical position within the bar. Otherwise,
       * the origin is changed relative to the start of the first measure on the system, and these values are used when
       * the current measure or a succeeding measure starts a new system. Positive x is right and negative x is left.
       */
      ['default-x']: t.label({ label: 'default-x', value: t.optional(dataTypes.tenths()) }),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
       * staff. Positive y is up and negative y is down.
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
       * Distinguishes between different line lengths for doit, falloff, plop, and scoop articulations.
       */
      ['line-length']: t.optional(dataTypes.lineLength()),

      /**
       * Is the line straight or curved?
       */
      ['line-shape']: t.optional(dataTypes.lineShape()),

      /**
       * Specifies if the line is solid, dashed, dotted, or wavy.
       */
      ['line-type']: t.optional(dataTypes.lineType()),

      /**
       * Indicates whether something is above or below another element, such as a note or a notation.
       */
      placement: t.optional(dataTypes.aboveBelow()),

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

      /**
       * The length of spaces in a dashed line. Ignored if the corresponding line-type attribute is not dashed.
       */
      ['space-length']: t.optional(dataTypes.tenths()),
    },
    content: [] as const,
  },
  {}
);
