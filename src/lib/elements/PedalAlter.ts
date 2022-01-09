import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<pedal-alter>` element
 *
 * Parent element: `<pedal-tuning>`
 *
 * The `<pedal-alter>` element defines the chromatic alteration for a single harp pedal.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/pedal-alter/}
 */
export type PedalAlter = ReturnType<typeof PedalAlter>;

export const PedalAlter = xml.element(
  'pedal-alter',
  { attributes: {}, content: [t.required(dataTypes.semitones())] as const },
  {}
);
