import { t } from '../schema';
/**
 * The stick-location type represents pictograms for the location of sticks, beaters, or mallets on cymbals, gongs,
 * drums, and other instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/stick-location/}
 */
export const stickLocation = () =>
  t.label({ label: 'stick-location', value: t.choices(...(['center', 'cymbal bell', 'cymbal edge', 'rim'] as const)) });
