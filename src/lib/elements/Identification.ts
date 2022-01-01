import { t, xml } from '../xml';
import { Creator } from './Creator';
import { Encoding } from './Encoding';
import { Miscellaneous } from './Miscellaneous';
import { Relation } from './Relation';
import { Rights } from './Rights';
import { Source } from './Source';

/**
 * The `<identification>` element
 *
 * Parent elements: `<score-part>`, `<score-partwise>`, `<score-timewise>`
 *
 * The `<identification>` element contains basic metadata about the score. It includes information that may apply at a
 * score-wide, movement-wide, or part-wide level. The `<creator>`, `<rights>`, `<source>`, and `<relation>` elements are
 * based on Dublin Core.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/identification/}
 */
export type Identification = ReturnType<typeof Identification>;

export const Identification = xml.element(
  'identification',
  {
    attributes: {},
    content: [
      t.zeroOrMore(Creator),
      t.zeroOrMore(Rights),
      t.optional(Encoding),
      t.optional(Source),
      t.zeroOrMore(Relation),
      t.optional(Miscellaneous),
    ] as const,
  },
  {}
);
