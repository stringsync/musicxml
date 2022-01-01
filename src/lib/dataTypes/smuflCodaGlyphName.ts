import { t } from '../xml';

/**
 * The smufl-coda-glyph-name type is used to reference a specific Standard Music Font Layout (SMuFL) coda character. The
 * value is a SMuFL canonical glyph name that starts with coda.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/smufl-coda-glyph-name/}
 */
export const smuflCodaGlyphName = () => t.regex({ pattern: /coda\c*/, zero: () => 'coda' });
