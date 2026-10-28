import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<tuplet-dot>` element
 *
 * Parent elements: `<tuplet-actual>`, `<tuplet-normal>`
 *
 * The `<tuplet-dot>` element is used to specify dotted tuplet types.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/tuplet-dot/}
 */
export const TupletDot = schema(
  'tuplet-dot',
  {
    /**
     * Indicates the color of an element.
     */
    color: t.optional(dataTypes.color()),

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
  [] as const
);
