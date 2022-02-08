import { schema, t } from '../schema';
import { Extend } from './Extend';
import { FigureNumber } from './FigureNumber';
import { Footnote } from './Footnote';
import { Level } from './Level';
import { Prefix } from './Prefix';
import { Suffix } from './Suffix';

/**
 * The `<figure>` element
 *
 * Parent element: `<figured-bass>`
 *
 * The `<figure>` element represents a single figure within a `<figured-bass>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/figure/}
 */
export const Figure = schema('figure', {}, [
  t.optional(Prefix),
  t.optional(FigureNumber),
  t.optional(Suffix),
  t.optional(Extend),
  t.optional(Footnote),
  t.optional(Level),
] as const);
