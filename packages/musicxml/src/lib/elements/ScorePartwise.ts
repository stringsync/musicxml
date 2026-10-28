import { schema, t } from '../schema';
import { Credit } from './Credit';
import { Defaults } from './Defaults';
import { Identification } from './Identification';
import { MovementNumber } from './MovementNumber';
import { MovementTitle } from './MovementTitle';
import { PartList } from './PartList';
import { PartPartwise } from './PartPartwise';
import { Work } from './Work';

/**
 * The `<score-partwise version="4.0">` element
 *
 * Parent elements: None
 *
 * The `<score-partwise version="4.0">` element is the root element for a partwise MusicXML score. It includes score header
 * information followed by a series of `<part>` elements with `<measure>` elements inside.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/score-partwise/}
 */
export const ScorePartwise = schema(
  'score-partwise',
  {
    /**
     * The version attribute was added in Version 1.1 for the score-partwise and score-timewise documents. It provides
     * an easier way to get version information than through the MusicXML public ID. The default value is 1.0 to make
     * it possible for programs that handle later versions to distinguish earlier version files reliably. Programs
     * that write MusicXML 1.1 or later files should set this attribute.
     */
    version: t.constant('4.0' as const),
  },
  [
    t.optional(Work),
    t.optional(MovementNumber),
    t.optional(MovementTitle),
    t.optional(Identification),
    t.optional(Defaults),
    t.label({ label: 'credits', value: t.zeroOrMore(Credit) }),
    t.required(PartList),
    t.label({ label: 'parts', value: t.oneOrMore(PartPartwise) }),
  ] as const
);
