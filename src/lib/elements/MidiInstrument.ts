import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { Elevation } from './Elevation';
import { MidiBank } from './MidiBank';
import { MidiChannel } from './MidiChannel';
import { MidiName } from './MidiName';
import { MidiProgram } from './MidiProgram';
import { MidiUnpitched } from './MidiUnpitched';
import { Pan } from './Pan';
import { Volume } from './Volume';

/**
 * The `<midi-instrument>` element
 *
 * Parent elements: `<score-part>`, `<sound>`
 *
 * The `<midi-instrument>` element defines MIDI 1.0 instrument playback. The `<midi-instrument>` element can be a part
 * of either the `<score-instrument>` element at the start of a part, or the <sound>` element within a part.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/midi-instrument/}
 */
export const MidiInstrument = schema(
  'midi-instrument',
  {
    /**
     * Refers to the `<score-instrument>` element affected by the change.
     */
    id: t.required(dataTypes.idref()),
  },
  [
    t.optional(MidiChannel),
    t.optional(MidiName),
    t.optional(MidiBank),
    t.optional(MidiProgram),
    t.optional(MidiUnpitched),
    t.optional(Volume),
    t.optional(Pan),
    t.optional(Elevation),
  ] as const
);
