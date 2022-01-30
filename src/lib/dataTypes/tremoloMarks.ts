import { t } from '../xml';

/**
 * The number of tremolo marks is represented by a number from 0 to 8: the same as beam-level with 0 added.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/tremolo-marks/}
 */
export const tremoloMarks = () => t.int({ min: 0, max: 8 });
