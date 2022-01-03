import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<midi-program>` element
 *
 * Parent element: `<midi-instrument>`
 *
 * The `<midi-program>` element specifies a MIDI 1.0 program number ranging from 1 to 128.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/midi-program/}
 */
export type MidiProgram = ReturnType<typeof MidiProgram>;

export const MidiProgram = xml.element(
  'midi-program',
  { attributes: {}, content: [t.required(dataTypes.midi128())] as const },
  {}
);
