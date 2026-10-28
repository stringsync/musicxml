import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<encoder>` element
 *
 * Parent element: `<encoding>`
 *
 * The `<encoder>` element contains information about who did the digital encoding.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/encoder/}
 */
export const Encoder = schema(
  'encoder',
  {
    /**
     * Standard values are music, words, and arrangement, but other types may be used. This attribute is only needed
     * when there are multiple `<encoder>` elements.
     */
    type: t.optional(dataTypes.string()),
  },
  [t.required(dataTypes.string())] as const
);
