import { schema } from '../schema';

/**
 * The `<group-time>` element
 *
 * Parent element: `<part-group>`
 *
 * The `<group-time>` element indicates that the displayed time signatures should stretch across all parts and staves in
 * the group.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/group-time/}
 */
export const GroupTime = schema('group-time', {}, [] as const);
