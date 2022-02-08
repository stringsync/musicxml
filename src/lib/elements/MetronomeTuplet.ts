import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { ActualNotes } from './ActualNotes';
import { NormalDot } from './NormalDot';
import { NormalNotes } from './NormalNotes';
import { NormalType } from './NormalType';

/**
 * The `<metronome-tuplet>` element
 *
 * Parent element: `<metronome-note>`
 *
 * The `<metronome-tuplet>` element uses the same element structure as the `<time-modification>` element, along with
 * some attributes from the `<tuplet>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/metronome-tuplet/}
 */
export const MetronomeTuplet = schema(
  'metronome-tuplet',
  {
    /**
     * Indicates if this is the start or stop of the metronome tuplet.
     */
    type: t.required(dataTypes.startStop()),

    /**
     * Specifies whether or not brackets are put around a symbol for an editorial indication. If not specified, it is
     * left to application defaults.
     */
    bracket: t.optional(dataTypes.yesNo()),

    /**
     * Used to display either the number of actual notes, the number of both actual and normal notes, or neither. It
     * is actual if not specified.
     */
    ['show-number']: t.optional(dataTypes.showTuplet()),
  },
  [
    t.required(ActualNotes),
    t.required(NormalNotes),
    t.label({ label: 'normal', value: t.optional([t.required(NormalType), t.zeroOrMore(NormalDot)]) }),
  ] as const
);
