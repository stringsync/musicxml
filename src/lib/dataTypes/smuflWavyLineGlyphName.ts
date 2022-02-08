import { t } from '../schema';
/**
 * The smufl-wavy-line-glyph-name type is used to reference a specific Standard Music Font Layout (SMuFL) wavy line
 * character. The value is a SMuFL canonical glyph name that either starts with wiggle, or begins with guitar and ends
 * with VibratoStroke. This includes all the glyphs in the Multi-segment lines range, excluding the beam glyphs.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/smufl-wavy-line-glyph-name/}
 */
export const smuflWavyLineGlyphName = () => {
  return t.regex({ pattern: /(wiggle)|(guitar\c*VibratoStroke)/, zero: 'wiggle' });
};
