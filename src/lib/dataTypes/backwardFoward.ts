import { t } from '../xml';

/**
 * The backward-forward type is used to specify repeat directions. The start of the repeat has a forward direction while
 * the end of the repeat has a backward direction.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/backward-forward/}
 */
export const backwardForward = () => t.choices('backward' as const, 'forward' as const);
