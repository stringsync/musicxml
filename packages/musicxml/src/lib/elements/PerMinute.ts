import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<per-minute>` element
 *
 * Parent element: `<metronome>`
 *
 * The `<per-minute>` element can be a number, or a text description including numbers. If a font is specified, it
 * overrides the font specified for the overall `<metronome>` element. This allows separate specification of a music
 * font for the `<beat-unit>` and a text font for the numeric value, in cases where a single metronome font is not used.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/per-minute/}
 */
export const PerMinute = schema(
  'per-minute',
  {
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
  },
  [t.required(dataTypes.string())] as const
);
