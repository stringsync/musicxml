import { commaSeparatedText } from './commaSeparatedText';

/**
 * The font-family is a comma-separated list of font names. These can be specific font styles such as Maestro or Opus,
 * or one of several generic font styles: music, engraved, handwritten, text, serif, sans-serif, handwritten, cursive,
 * fantasy, and monospace. The music, engraved, and handwritten values refer to music fonts; the rest refer to text
 * fonts. The fantasy style refers to decorative text such as found in older German-style printing.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/font-family/}
 */
export const fontFamily = () => commaSeparatedText();
