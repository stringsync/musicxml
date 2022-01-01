import { t } from '../xml';

/**
 * The top-bottom type is used to indicate the top or bottom part of a vertical shape like non-arpeggiate.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/top-bottom/}
 */
export const topBottom = () => t.choices('top' as const, 'bottom' as const);
