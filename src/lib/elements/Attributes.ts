import { t, xml } from '../xml';
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
export type Attributes = ReturnType<typeof Attributes>;

export const Attributes = xml.element(
  'attributes',
  {
    attributes: {},
    content: [
      t.optional(Footnote),
      t.optional(Level),
      t.optional(Divisions),
      t.zeroOrMore(Key),
      t.zeroOrMore(Time),
      t.optional(Staves),
      t.optional(PartSymbol),
      t.optional(Instruments),
      t.zeroOrMore(Clef),
      t.zeroOrMore(StaffDetails),
      t.choices(t.zeroOrMore(Transpose), t.zeroOrMore(ForPart)),
      t.zeroOrMore(Directive),
      t.zeroOrMore(MeasureStyle),
    ] as const,
  },
  {}
);
