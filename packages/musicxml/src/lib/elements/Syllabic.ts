import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<syllabic>` element
 *
 * Parent element: `<lyric>`
 *
 * The `<syllabic>` element indicates lyric hyphenation. The single, begin, end, and middle values represent
 * single-syllable words, word-beginning syllables, word-ending syllables, and mid-word syllables, respectively.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/syllabic/}
 */
export const Syllabic = schema('syllabic', {}, [t.required(dataTypes.syllabic())] as const);
