import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

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
export const TuningOctave = schema('tuning-octave', {}, [t.required(dataTypes.octave())] as const);
