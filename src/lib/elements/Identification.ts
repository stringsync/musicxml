import { schema, t } from '../schema';
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
export const Identification = schema('identification', {}, [
  t.label({ label: 'creators', value: t.zeroOrMore(Creator) }),
  t.label({ label: 'rights', value: t.zeroOrMore(Rights) }),
  t.optional(Encoding),
  t.optional(Source),
  t.label({ label: 'relations', value: t.zeroOrMore(Relation) }),
  t.optional(Miscellaneous),
] as const);
