import { t } from '../schema';
/**
 * The left-right type is used to indicate whether one element appears to the left or the right of another element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/left-right/}
 */
export const leftRight = () => t.choices('left' as const, 'right' as const);
