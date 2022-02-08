import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<tuning-alter>` element
 *
 * Parent elements: `<accord>`, `<staff-tuning>`
 *
 * The `<tuning-alter>` element is represented like the `<alter>` element, with a different name to reflect its
 * different function in string tuning.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/tuning-alter/}
 */
export const TuningAlter = schema('tuning-alter', {}, [t.required(dataTypes.semitones())] as const);
