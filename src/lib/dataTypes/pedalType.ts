import { t } from '../schema';
/**
 * The pedal-type distinguishes types of pedal directions.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/pedal-type/}
 */
export const pedalType = () => {
  return t.choices(...(['start', 'stop', 'sostenuto', 'change', 'continue', 'discountiue', 'resume'] as const));
};
