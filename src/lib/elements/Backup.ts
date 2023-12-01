import { schema, t } from '../schema';
import { Duration } from './Duration';
import { Footnote } from './Footnote';
import { Level } from './Level';

/**
 * The `<backup>` element
 *
 * Parent elements: `<measure>` (partwise), `<part>` (timewise)
 *
 * The `<backup>` and `<forward>` elements are required to coordinate multiple voices in one part, including music on
 * multiple staves. The `<backup>` element is generally used to move between voices and staves. Thus it does not include
 * `<voice>` or `<staff>` elements. Duration values should always be positive, and should not cross measure boundaries
 * or mid-measure changes in the `<divisions>` value.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/backup/}
 */
export const Backup = schema('backup', {}, [t.required(Duration), t.optional(Footnote), t.optional(Level)] as const);
