import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<bar-style>` element
 *
 * Parent element: `<barline>`
 *
 * The `<bar-style>` element contains barline style and color information.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/bar-style/}
 */
export const BarStyle = schema(
  'bar-style',
  {
    /**
     * Indicates the color of an element.
     */
    color: t.optional(dataTypes.color()),
  },
  [t.required(dataTypes.barStyle())] as const
);
