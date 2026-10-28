import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<midi-bank>` element
 *
 * Parent element: `<midi-instrument>`
 *
 * The `<midi-bank>` element specifies a MIDI 1.0 bank number ranging from 1 to 16,384.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/midi-bank/}
 */
export const MidiBank = schema('midi-bank', {}, [t.required(dataTypes.midi16384())] as const);
