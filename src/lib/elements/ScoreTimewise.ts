import { t, xml } from '../xml';
import { Credit } from './Credit';
import { Defaults } from './Defaults';
import { Identification } from './Identification';
import { Measure } from './Measure';
import { MovementNumber } from './MovementNumber';
import { MovementTitle } from './MovementTitle';
import { PartList } from './PartList';
import { Work } from './Work';

/**
 * The `<score-timewise>` element
 *
 * Parent elements: None
 *
 * The `<score-timewise>` element is the root element for a timewise MusicXML score. It includes score header
 * information followed by a series of `<measure>` elements with `<part>` elements inside.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/score-timewise/}
 */
export type ScoreTimewise = ReturnType<typeof ScoreTimewise>;

export const ScoreTimewise = xml.element(
  'score-timewise',
  {
    attributes: {
      /**
       * The version attribute was added in Version 1.1 for the score-partwise and score-timewise documents. It provides
       * an easier way to get version information than through the MusicXML public ID. The default value is 1.0 to make
       * it possible for programs that handle later versions to distinguish earlier version files reliably. Programs
       * that write MusicXML 1.1 or later files should set this attribute.
       */
      version: t.constant('4.0' as const),
    },
    content: [
      t.optional(Work),
      t.optional(MovementNumber),
      t.optional(MovementTitle),
      t.optional(Identification),
      t.optional(Defaults),
      t.label({ label: 'credits', value: t.zeroOrMore(Credit) }),
      t.required(PartList),
      t.label({ label: 'measures', value: t.oneOrMore(Measure) }),
    ] as const,
  },
  {}
);
