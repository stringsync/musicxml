import { schema, t } from '../schema';
import { Clef } from './Clef';
import { Directive } from './Directive';
import { Divisions } from './Divisions';
import { Footnote } from './Footnote';
import { ForPart } from './ForPart';
import { Instruments } from './Instruments';
import { Key } from './Key';
import { Level } from './Level';
import { MeasureStyle } from './MeasureStyle';
import { PartSymbol } from './PartSymbol';
import { StaffDetails } from './StaffDetails';
import { Staves } from './Staves';
import { Time } from './Time';
import { Transpose } from './Transpose';

/**
 * The `<attributes>` element
 *
 * Parent elements: `<measure>` (partwise), `<part>` (timewise)
 *
 * The `<attributes>` element contains musical information that typically changes on measure boundaries. This includes
 * key and time signatures, clefs, transpositions, and staving. When attributes are changed mid-measure, it affects the
 * music in score order, not in MusicXML document order.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/attributes/}
 */
export const Attributes = schema('attributes', {}, [
  t.optional(Footnote),
  t.optional(Level),
  t.optional(Divisions),
  t.label({ label: 'keys', value: t.zeroOrMore(Key) }),
  t.label({ label: 'times', value: t.zeroOrMore(Time) }),
  t.optional(Staves),
  t.optional(PartSymbol),
  t.optional(Instruments),
  t.label({ label: 'clefs', value: t.zeroOrMore(Clef) }),
  t.label({ label: 'staff-details', value: t.zeroOrMore(StaffDetails) }),
  t.label({ label: 'transpositions', value: t.choices(t.zeroOrMore(Transpose), t.zeroOrMore(ForPart)) }),
  t.label({ label: 'directives', value: t.zeroOrMore(Directive) }),
  t.label({ label: 'measure-styles', value: t.zeroOrMore(MeasureStyle) }),
] as const);
