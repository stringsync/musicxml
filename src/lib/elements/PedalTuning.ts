import { t, xml } from '../xml';
import { PedalAlter } from './PedalAlter';
import { PedalStep } from './PedalStep';

/**
 * The `<pedal-tuning>` element
 *
 * Parent element: `<harp-pedals>`
 *
 * The `<pedal-tuning>` element specifies the tuning of a single harp pedal.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/pedal-tuning/}
 */
export type PedalTuning = ReturnType<typeof PedalTuning>;

export const PedalTuning = xml.element(
  'pedal-tuning',
  { attributes: {}, content: [t.required(PedalStep), t.required(PedalAlter)] as const },
  {}
);
