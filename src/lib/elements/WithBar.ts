import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<with-bar>` element
 *
 * Parent element: `<bend>`
 *
 * The `<with-bar>` element indicates that the bend is to be done at the bridge with a whammy or vibrato bar. The
 * content of the element indicates how this should be notated. Content values of "scoop" and "dip" refer to the
 * Standard Music Font Layout (SMuFL) guitarVibratoBarScoop and guitarVibratoBarDip glyphs.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/with-bar/}
 */
export type WithBar = ReturnType<typeof WithBar>;

export const WithBar = xml.element(
  'with-bar',
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
       * The percentage of the duration for starting a bend. Default is 25.
       */
      ['first-beat']: t.optional(dataTypes.percent()),

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
    },
    content: [t.required(dataTypes.string())] as const,
  },
  {}
);
