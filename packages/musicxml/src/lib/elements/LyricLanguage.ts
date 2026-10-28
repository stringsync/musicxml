import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<lyric-language>` element
 *
 * Parent element: `<defaults>`
 *
 * The `<lyric-language>` element specifies the default language for a particular name and number of lyric.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/lyric-language/}
 */
export const LyricLanguage = schema(
  'lyric-language',
  {
    /**
     * The default language for the specified lyric name and number.
     */
    ['xml:lang']: t.required(dataTypes.xml.lang()),

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
