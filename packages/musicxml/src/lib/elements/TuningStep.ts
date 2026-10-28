import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<tuning-step>` element
 *
 * Parent elements: `<accord>`, `<staff-tuning>`
 *
 * The `<tuning-step>` element is represented like the `<step>` element, with a different name to reflect its different
 * function in string tuning.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/tuning-step/}
 */
export const TuningStep = schema('tuning-step', {}, [t.required(dataTypes.step())] as const);
