import { t } from '../schema';
/**
 * The step type represents a step of the diatonic scale, represented using the English letters A through G.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/step/}
 */
export const step = () => {
  return t.label({ label: 'step', value: t.choices(...(['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const)) });
};
