import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<step>` element
 *
 * Parent element: `<pitch>`
 *
 * The `<step>` element represents a step of the diatonic scale, represented using the English letters A through G.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/step/}
 */
export const Step = schema('step', {}, [t.required(dataTypes.step())] as const);
