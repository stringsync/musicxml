import { t } from '../xml';

/**
 * The step type represents a step of the diatonic scale, represented using the English letters A through G.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/step/}
 */
export const step = () => t.choices(...(['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const));
