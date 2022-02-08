import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<pedal-step>` element
 *
 * Parent element: `<pedal-tuning>`
 *
 * The `<pedal-step>` element defines the pitch step for a single harp pedal.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/pedal-step/}
 */
export const PedalStep = schema('pedal-step', {}, [t.required(dataTypes.step())] as const);
