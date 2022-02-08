import { t } from '../schema';
/**
 * The midi-16 type is used to express MIDI 1.0 values that range from 1 to 16.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/midi-16/}
 */
export const midi16 = () => t.label({ label: 'midi16', value: t.int({ min: 1, max: 16 }) });
