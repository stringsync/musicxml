import { t } from '../schema';
/**
 * The line-length type distinguishes between different line lengths for doit, falloff, plop, and scoop articulations.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/line-length/}
 */
export const lineLength = () => t.choices(...(['short', 'medium', 'long'] as const));
