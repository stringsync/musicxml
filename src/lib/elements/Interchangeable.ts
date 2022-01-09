import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { Beats } from './Beats';
import { BeatType } from './BeatType';
import { TimeRelation } from './TimeRelation';

/**
 * The `<interchangeable>` element
 *
 * Parent element: `<time>`
 *
 * The `<interchangeable>` element is used to represent the second in a pair of interchangeable dual time signatures,
 * such as the 6/8 in 3/4 (6/8).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/interchangeable/}
 */
export type Interchangeable = ReturnType<typeof Interchangeable>;

export const Interchangeable = xml.element(
  'interchangeable',
  {
    attributes: {
      /**
       * Indicates how to display the arrangement between the `<beats>` and `<beat-type>` values in the second of the dual
       * time signatures.
       */
      separator: t.optional(dataTypes.timeSeparator()),

      /**
       * Indicates how to display the second of the dual time signatures, such as by using common and cut time symbols
       * or a single number display.
       */
      symbol: t.optional(dataTypes.timeSymbol()),
    },
    content: [t.optional(TimeRelation), t.oneOrMore([t.required(Beats), t.required(BeatType)])] as const,
  },
  {}
);
