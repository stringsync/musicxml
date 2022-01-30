import { t } from '../xml';

/**
 * The smufl-pictogram-glyph-name type is used to reference a specific Standard Music Font Layout (SMuFL) percussion
 * pictogram character. The value is a SMuFL canonical glyph name that starts with pict.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/smufl-pictogram-glyph-name/}
 */
export const smuflPictogramGlyphName = () => t.regex({ pattern: /pict\c+/, zero: 'pict' });
