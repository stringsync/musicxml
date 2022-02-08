import { t } from '../schema';
/**
 * The up-down-stop-continue type is used for octave-shift elements, indicating the direction of the shift from their
 * true pitched values because of printing difficulty.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/up-down-stop-continue/}
 */
export const upDownStopContinue = () => t.choices(...(['up', 'down', 'stop', 'continue'] as const));
