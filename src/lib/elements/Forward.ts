import { t, xml } from '../xml';
import { Duration } from './Duration';
import { Footnote } from './Footnote';
import { Level } from './Level';
import { Staff } from './Staff';
import { Voice } from './Voice';

/**
 * The `<forward>` element
 *
 * Parent elements: `<measure>` (partwise), `<part>` (timewise)
 *
 * The `<backup>` and `<forward>` elements are required to coordinate multiple voices in one part, including music on
 * multiple staves. The `<forward>` element is generally used within voices and staves. Duration values should always be
 * positive, and should not cross measure boundaries or mid-measure changes in the `<divisions>` value.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/forward/}
 */
export type Forward = ReturnType<typeof Forward>;

export const Forward = xml.element(
  'forward',
  {
    attributes: {},
    content: [
      t.required(Duration),
      t.optional(Footnote),
      t.optional(Level),
      t.optional(Voice),
      t.optional(Staff),
    ] as const,
  },
  {}
);
