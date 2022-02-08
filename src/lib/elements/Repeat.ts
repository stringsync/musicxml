import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<repeat>` element
 *
 * Parent element: `<barline>`
 *
 * The `<repeat>` element represents repeat marks.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/repeat/}
 */
export const Repeat = schema(
  'repeat',
  {
    /**
     * The start of the repeat has a forward direction while the end of the repeat has a backward direction.
     */
    direction: t.required(dataTypes.backwardForward()),

    /**
     * Indicates if the repeats are played after a jump due to a da capo or dal segno. It is only used with backward
     * repeats that are not part of an ending.
     */
    ['after-jump']: t.optional(dataTypes.yesNo()),

    /**
     * Indicates the number of times the repeated section is played. It is only used with backward repeats that are not
     * part of an ending.
     */
    times: t.optional(dataTypes.nonNegativeInteger()),

    /**
     * Indicates whether the repeat has winged extensions that appear above and below the barline.
     */
    winged: t.optional(dataTypes.winged()),
  },
  [] as const
);
