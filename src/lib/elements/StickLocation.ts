import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

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
export type StickLocation = ReturnType<typeof StickLocation>;

export const StickLocation = xml.element(
  'stick-location',
  { attributes: {}, content: [t.required(dataTypes.stickLocation())] as const },
  {}
);
