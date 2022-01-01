import { t } from '../xml';

/**
 * The color type indicates the color of an element. Color may be represented as hexadecimal RGB triples, as in HTML, or
 * as hexadecimal ARGB tuples, with the A indicating alpha of transparency. An alpha value of 00 is totally transparent;
 * FF is totally opaque. If RGB is used, the A value is assumed to be FF.
 *
 * For instance, the RGB value "#800080" represents purple. An ARGB value of "#40800080" would be a transparent purple.
 *
 * As in SVG 1.1, colors are defined in terms of the sRGB color space (IEC 61966).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/color/}
 */
export const color = () => t.regex({ pattern: /#[\dA-F]{6}([\dA-F][\dA-F])?/, zero: () => '#000000' });
