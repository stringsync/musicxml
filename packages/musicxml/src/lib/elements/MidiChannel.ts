import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<midi-channel>` element
 *
 * Parent element: `<midi-instrument>`
 *
 * The `<midi-channel>` element specifies a MIDI 1.0 channel numbers ranging from 1 to 16.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/midi-channel/}
 */
export const MidiChannel = schema('midi-channel', {}, [t.required(dataTypes.midi16())] as const);
