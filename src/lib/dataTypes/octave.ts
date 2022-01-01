import { t } from '../xml';

/**
 * Octaves are represented by the numbers 0 to 9, where 4 indicates the octave started by middle C.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/octave/}
 */
export const octave = () => t.range({ min: 0, max: 9 });
