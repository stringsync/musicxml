import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
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
export type Rest = ReturnType<typeof Rest>;

export const Rest = xml.element(
  'rest',
  {
    attributes: {
      /**
       * If yes, this indicates this is a complete measure rest.
       */
      measure: t.optional(dataTypes.yesNo()),
    },
    content: [t.required(DisplayStep), t.required(DisplayOctave)] as const,
  },
  {}
);
