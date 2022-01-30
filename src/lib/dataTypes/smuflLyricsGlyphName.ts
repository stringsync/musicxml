import { t } from '../xml';

/**
 * The smufl-lyrics-glyph-name type is used to reference a specific Standard Music Font Layout (SMuFL) lyrics elision
 * character. The value is a SMuFL canonical glyph name that starts with lyrics.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/smufl-lyrics-glyph-name/}
 */
export const smuflLyricsGlyphName = () => t.regex({ pattern: /lyrics\c+/, zero: 'lyrics' });
