import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<rights>` element
 *
 * Parent element: `<identification>`
 *
 * The `<rights>` element contains copyright and other intellectual property notices. This is similar to the Dublin
 * Core rights element. Words, music, and derivatives can have different types, so multiple <rights> elements with
 * different type attributes are supported.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/rights/}
 */
export const Rights = schema(
  'rights',
  {
    /**
     * Standard type values are music, words, and arrangement, but other types may be used. This attribute is only
     * needed when there are multiple `<rights>` elements.
     */
    type: t.optional(dataTypes.token()),
  },
  [t.required(dataTypes.string())] as const
);
