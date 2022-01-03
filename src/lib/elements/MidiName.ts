import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<midi-name>` element
 *
 * Parent element: `<midi-instrument>`
 *
 * The `<midi-name>` element corresponds to a ProgramName meta-event within a Standard MIDI File.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/midi-name/}
 */
export type MidiName = ReturnType<typeof MidiName>;

export const MidiName = xml.element(
  'midi-name',
  { attributes: {}, content: [t.required(dataTypes.string())] as const },
  {}
);
