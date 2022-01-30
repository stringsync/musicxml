import { t } from '../xml';

/**
 * The midi-16384 type is used to express MIDI 1.0 values that range from 1 to 16,384. MusicXML uses 1-based numbers
 * rather than 0-based numbers often found in MIDI 1.0 documentation.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/midi-16384/}
 */
export const midi16384 = () => t.int({ min: 1, max: 16384 });
