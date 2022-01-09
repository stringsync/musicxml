import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<tuning-octave>` element
 *
 * Parent elements: `<accord>`, `<staff-tuning>`
 *
 * The `<tuning-octave>` element is represented like the `<octave>` element, with a different name to reflect its
 * different function in string tuning.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/tuning-octave/}
 */
export type TuningOctave = ReturnType<typeof TuningOctave>;

export const TuningOctave = xml.element(
  'tuning-octave',
  { attributes: {}, content: [t.required(dataTypes.octave())] as const },
  {}
);
