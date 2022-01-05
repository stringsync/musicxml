import { t } from '../xml';

/**
 * Lyric hyphenation is indicated by the syllabic type. The single, begin, end, and middle values represent
 * single-syllable words, word-beginning syllables, word-ending syllables, and mid-word syllables, respectively.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/syllabic/}
 */
export const syllabic = () => t.choices(...(['begin', 'end', 'middle', 'single'] as const));