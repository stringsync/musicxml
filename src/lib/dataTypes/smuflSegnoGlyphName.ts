import { t } from '../xml';

/**
 * The smufl-segno-glyph-name type is used to reference a specific Standard Music Font Layout (SMuFL) segno character.
 * The value is a SMuFL canonical glyph name that starts with segno.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/smufl-segno-glyph-name/}
 */
export const smuflSegnoGlyphName = () => t.regex({ pattern: /segno\c*/, zero: () => 'segno' });
