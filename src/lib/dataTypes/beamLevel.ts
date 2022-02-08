import { t } from '../schema';
/**
 * The MusicXML format supports six levels of beaming, up to 1024th notes. Unlike the number-level type, the beam-level
 * type identifies concurrent beams in a beam group. It does not distinguish overlapping beams such as grace notes
 * within regular notes, or beams used in different voices.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/beam-level/}
 */
export const beamLevel = () => t.int({ min: 1, max: 8 });
