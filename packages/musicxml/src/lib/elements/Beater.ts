import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

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
export const Beater = schema(
  'beater',
  {
    /**
     * Indicates the direction in which the tip of the beater points.
     */
    tip: t.optional(dataTypes.tipDirection()),
  },
  [t.required(dataTypes.beaterValue())] as const
);
