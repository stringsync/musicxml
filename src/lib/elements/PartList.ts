import { schema, t } from '../schema';
import { PartGroup } from './PartGroup';
import { ScorePart } from './ScorePart';

/**
 * The `<part-list>` element
 *
 * Parent elements: `<score-partwise version="4.0">`, `<score-timewise>`
 *
 * The `<part-list>` element identifies the different musical parts in this document. Each part has an ID that is used
 * later within the musical data. Since parts may be encoded separately and combined later, identification elements are
 * present at both the score and <score-part> levels.
 *
 * There must be at least one `<score-part>`, combined as desired with `<part-group>` elements that indicate braces and
 * brackets. Parts are ordered from top to bottom in a score based on the order in which they appear in the
 * `<part-list>`.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/part-list/}
 */
export const PartList = schema('part-list', {}, [
  t.label({ label: 'part-groups', value: t.zeroOrMore(PartGroup) }),
  t.required(ScorePart),
  t.label({ label: 'parts', value: t.zeroOrMore(t.choices(PartGroup, ScorePart)) }),
] as const);
