import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<midi-name>` element
 *
 * Parent element: `<midi-instrument>`
 *
 * The `<midi-name>` element corresponds to a ProgramName meta-event within a Standard MIDI File.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/midi-name/}
 */
export const MidiName = schema('midi-name', {}, [t.required(dataTypes.string())] as const);
