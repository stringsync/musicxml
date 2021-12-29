import { Credit } from './Credit';
import { Defaults } from './Defaults';
import { element, t } from './factory';
import { Identification } from './Identification';
import { MovementNumber } from './MovementNumber';
import { Part } from './Part';
import { PartList } from './PartList';
import { Work } from './Work';

/**
 * Parent elements: None
 *
 * The <score-partwise> element is the root element for a partwise MusicXML score. It includes score header information
 * followed by a series of <part> elements with <measure> elements inside.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/score-partwise/}
 */
export const ScorePartwise = element('score-partwise', {
  attributes: {
    version: t.constant('4.0' as const),
  },
  content: t.list(
    t.optional(Work),
    t.optional(MovementNumber),
    t.optional(Identification),
    t.optional(Defaults),
    t.zeroOrMore(Credit),
    t.required(PartList),
    t.oneOrMore(Part)
  ),
});
