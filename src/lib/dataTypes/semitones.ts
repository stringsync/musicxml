import { t } from '../xml';

/**
 * The semitones type is a number representing semitones, used for chromatic alteration. A value of -1 corresponds to a
 * flat and a value of 1 to a sharp. Decimal values like 0.5 (quarter tone sharp) are used for microtones.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/semitones/}
 */
export const semitones = () => t.float();
