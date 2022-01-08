import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

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
export type Syllabic = ReturnType<typeof Syllabic>;

export const Syllabic = xml.element(
  'syllabic',
  { attributes: {}, content: [t.required(dataTypes.syllabic())] as const },
  {}
);
