import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<midi-unpitched>` element
 *
 * Parent element: `<midi-instrument>`
 *
 * For unpitched instruments, the `<midi-unpitched>` element specifies a MIDI 1.0 note number ranging from 1 to 128. It
 * is usually used with MIDI banks for percussion. Note that MIDI 1.0 note numbers are generally specified from 0 to 127
 * rather than the 1 to 128 numbering used in this element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/midi-unpitched/}
 */
export const MidiUnpitched = schema('midi-unpitched', {}, [t.required(dataTypes.midi128())] as const);
