import { t, xml } from '../xml';
import { ActualNotes } from './ActualNotes';
import { NormalDot } from './NormalDot';
import { NormalNotes } from './NormalNotes';
import { NormalType } from './NormalType';

/**
 * The `<time-modification>` element
 *
 * Parent element: `<note>`
 *
 * Time modification indicates tuplets, double-note tremolos, and other durational changes. A `<time-modification>`
 * element shows how the cumulative, sounding effect of tuplets and double-note tremolos compare to the written note
 * type represented by the `<type>` and `<dot>` elements. Nested tuplets and other notations that use more detailed
 * information need both the `<time-modification>` and `<tuplet>` elements to be represented accurately.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/time-modification/}
 */
export type TimeModification = ReturnType<typeof TimeModification>;

export const TimeModification = xml.element(
  'time-modification',
  {
    attributes: {},
    content: [
      t.required(ActualNotes),
      t.required(NormalNotes),
      t.optional([t.required(NormalType), t.zeroOrMore(NormalDot)]),
    ] as const,
  },
  {}
);
