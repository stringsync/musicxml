import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<pedal-alter>` element
 *
 * Parent element: `<pedal-tuning>`
 *
 * The `<pedal-alter>` element defines the chromatic alteration for a single harp pedal.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/pedal-alter/}
 */
export const PedalAlter = schema('pedal-alter', {}, [t.required(dataTypes.semitones())] as const);
