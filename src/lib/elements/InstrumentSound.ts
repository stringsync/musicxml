import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<instrument-sound>` element
 *
 * Parent elements: `<instrument-change>`, `<score-instrument>`
 *
 * The `<instrument-sound>` element describes the default timbre of the `<score-instrument>`. This description is
 * independent of a particular virtual or MIDI instrument specification and allows playback to be shared more easily
 * between applications and libraries.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/instrument-sound/}
 */
export type InstrumentSound = ReturnType<typeof InstrumentSound>;

export const InstrumentSound = xml.element(
  'instrument-sound',
  { attributes: {}, content: [t.required(dataTypes.string())] as const },
  {}
);
