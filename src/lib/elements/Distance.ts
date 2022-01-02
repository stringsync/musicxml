import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<distance>` element
 *
 * Parent element: `<appearance>`
 *
 * The `<distance>` element represents standard distances between notation elements in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/distance/}
 */
export type Distance = ReturnType<typeof Distance>;

export const Distance = xml.element(
  'distance',
  {
    attributes: {
      /**
       * The type of distance being defined.
       */
      type: t.required(dataTypes.distanceType()),
    },
    content: [t.required(dataTypes.tenths())] as const,
  },
  {}
);
