import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<hole-closed>` element
 *
 * Parent element: `<hole>`
 *
 * The `<hole-closed>` element represents whether the hole is closed, open, or half-open.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/hole-closed/}
 */
export type HoleClosed = ReturnType<typeof HoleClosed>;

export const HoleClosed = xml.element(
  'hole-closed',
  {
    attributes: {
      /**
       * Indicates which portion of the hole is filled in when the element value is half.
       */
      location: t.optional(dataTypes.holeClosedLocation()),
    },
    content: [t.required(dataTypes.holeClosedValue())] as const,
  },
  {}
);
