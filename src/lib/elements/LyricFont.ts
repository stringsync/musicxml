import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<defaults>` element
 *
 * Parent elements: `<score-partwise>`, `<score-timewise>`
 *
 * The `<defaults>` element specifies score-wide defaults for scaling; whether or not the file is a concert score;
 * layout; and default values for the music font, word font, lyric font, and lyric language. Except for the
 * `<concert-score>` element, if any defaults are missing, the choice of what to use is determined by the application.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/defaults/}
 */
export const LyricFont = schema(
  'lyric-font',
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

    /**
     * The lyric name for which this is the default, corresponding to the name attribute in the `<lyric>` element.
     */
    name: t.optional(dataTypes.token()),

    /**
     * The lyric number for which this is the default, corresponding to the number attribute in the `<lyric>` element.
     */
    number: t.optional(dataTypes.nmtoken()),
  },
  [] as const
);
