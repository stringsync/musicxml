import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<midi-channel>` element
 *
 * Parent element: `<midi-instrument>`
 *
 * The `<midi-channel>` element specifies a MIDI 1.0 channel numbers ranging from 1 to 16.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/midi-channel/}
 */
export type MidiChannel = ReturnType<typeof MidiChannel>;

export const MidiChannel = xml.element(
  'midi-channel',
  { attributes: {}, content: [t.required(dataTypes.midi16())] as const },
  {}
);
