import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<tie>` element
 *
 * Parent element: `<note>`
 *
 * The `<tie>` element indicates that a tie begins or ends with this note. The `<tie>` element indicates sound; the
 * `<tied>` element indicates notation.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/tie/}
 */
export type Tie = ReturnType<typeof Tie>;

export const Tie = xml.element(
  'tie',
  {
    attributes: {
      /**
       * Indicates if this is the start or stop of the tie.
       */
      type: t.required(dataTypes.startStop()),

      /**
       * Indicates which particular times to apply a `<tie>` element through a repeated section.
       */
      ['time-only']: t.optional(dataTypes.timeOnly()),
    },
    content: [] as const,
  },
  {}
);
