import { nmtoken } from './nmtoken';

/**
 * The smufl-glyph-name type is used for attributes that reference a specific Standard Music Font Layout (SMuFL)
 * character. The value is a SMuFL canonical glyph name, not a code point. For instance, the value for a standard piano
 * pedal mark would be keyboardPedalPed, not U+E650.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/smufl-glyph-name/}
 */
export const smuflGlyphName = () => nmtoken();
