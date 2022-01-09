import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<beater>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<beater>` element represents pictograms for beaters, mallets, and sticks that do not have different materials
 * represented in the pictogram.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/beater/}
 */
export type Beater = ReturnType<typeof Beater>;

export const Beater = xml.element(
  'beater',
  {
    attributes: {
      /**
       * Indicates the direction in which the tip of the beater points.
       */
      tip: t.optional(dataTypes.tipDirection()),
    },
    content: [t.required(dataTypes.beaterValue())] as const,
  },
  {}
);
