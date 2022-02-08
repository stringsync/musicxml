import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<stick-location>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<stick-location>` element represents pictograms for the location of sticks, beaters, or mallets on cymbals,
 * gongs, drums, and other instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/stick-location/}
 */
export const StickLocation = schema('stick-location', {}, [t.required(dataTypes.stickLocation())] as const);
