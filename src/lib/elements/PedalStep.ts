import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<pedal-step>` element
 *
 * Parent element: `<pedal-tuning>`
 *
 * The `<pedal-step>` element defines the pitch step for a single harp pedal.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/pedal-step/}
 */
export type PedalStep = ReturnType<typeof PedalStep>;

export const PedalStep = xml.element(
  'pedal-step',
  { attributes: {}, content: [t.required(dataTypes.step())] as const },
  {}
);
