import { t } from '../xml';

/**
 * The smufl-accidental-glyph-name type is used to reference a specific Standard Music Font Layout (SMuFL) accidental
 * character. The value is a SMuFL canonical glyph name that starts with one of the strings used at the start of glyph
 * names for SMuFL accidentals.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/smufl-accidental-glyph-name/}
 */
export const smuflAccidentalGlyphName = () => {
  return t.regex({ pattern: /(acc|medRenFla|medRenNatura|medRenShar|kievanAccidental)/, zero: 'acc' });
};
