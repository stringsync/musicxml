import { schema } from '../schema';

/**
 * The `<straight>` element
 *
 * Parent element: `<swing>`
 *
 * The `<straight>` element specifies that no swing is present, so consecutive notes have equal durations.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/straight/}
 */
export const Straight = schema('straight', {}, [] as const);
