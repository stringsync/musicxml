import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { DisplayOctave } from './DisplayOctave';
import { DisplayStep } from './DisplayStep';

/**
 * The `<rest>` element
 *
 * Parent element: `<note>
 *
 * The `<rest> element indicates notated rests or silences. A `<rest> element is usually empty, but placement on the
 * staff can be specified using `<display-step>` and `<display-octave>` elements.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/rest/}
 */
export const Rest = schema(
  'rest',
  {
    /**
     * If yes, this indicates this is a complete measure rest.
     */
    measure: t.optional(dataTypes.yesNo()),
  },
  [
    t.optional(
      t.label({
        label: 'value',
        value: [t.required(DisplayStep), t.required(DisplayOctave)],
      })
    ),
  ] as const
);
