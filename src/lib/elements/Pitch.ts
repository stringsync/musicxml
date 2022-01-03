import { t, xml } from '../xml';
import { Alter } from './Alter';
import { Octave } from './Octave';
import { Step } from './Step';

/**
 * The `<pitch>` element
 *
 * Parent element: `<note>`
 *
 * Pitch is represented as a combination of the step of the diatonic scale, the chromatic alteration, and the octave.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/pitch/}
 */
export type Pitch = ReturnType<typeof Pitch>;

export const Pitch = xml.element(
  'pitch',
  { attributes: {}, content: [t.required(Step), t.optional(Alter), t.required(Octave)] as const },
  {}
);
