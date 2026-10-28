import { t } from '../schema';
/**
 * The above-below type is used to indicate whether one element appears above or below another element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/above-below/}
 */
export const aboveBelow = () => t.choices('above' as const, 'below' as const);
