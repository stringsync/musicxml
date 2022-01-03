import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<midi-device>` element
 *
 * Parent elements: `<score-part>`, `<sound>`
 *
 * The `<midi-device>` element corresponds to the DeviceName meta event in Standard MIDI Files. Unlike the DeviceName
 * meta event, there can be multiple `<midi-device>` elements per MusicXML part.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/midi-device/}
 */
export type MidiDevice = ReturnType<typeof MidiDevice>;

export const MidiDevice = xml.element(
  'midi-device',
  {
    attributes: {
      /**
       * Refers to the `<score-instrument>` assigned to this device. If missing, the device assignment affects all
       * `<score-instrument>` elements in the `<score-part>`.
       */
      id: t.optional(dataTypes.idref()),

      /**
       * A number from 1 to 16 that can be used with the unofficial MIDI 1.0 port (or cable) meta event.
       */
      port: t.optional(dataTypes.midi16()),
    },
    content: [t.required(dataTypes.string())] as const,
  },
  {}
);
