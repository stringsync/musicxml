import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<distance>` element
 *
 * Parent element: `<appearance>`
 *
 * The `<distance>` element represents standard distances between notation elements in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/distance/}
 */
export const Distance = schema(
  'distance',
  {
    /**
     * The type of distance being defined.
     */
    type: t.required(dataTypes.distanceType()),
  },
  [t.label({ label: 'distance', value: t.required(dataTypes.tenths()) })] as const
);
