import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<music-font>` element
 *
 * Parent element: `<defaults>`
 *
 * The `<music-font>` element represents the default values for the music font in the score.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/music-font/}
 */
export const MusicFont = schema(
  'music-font',
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
  [] as const
);
