import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<other-play>` element
 *
 * Parent element: `<play>`
 *
 * The `<other-play>` element represents other types of playback not otherwise specified within the `<play>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/other-play/}
 */
export const OtherPlay = schema(
  'other-play',
  {
    /**
     * Indicates the type of playback to which the element content applies.
     */
    type: t.required(dataTypes.token()),
  },
  [] as const
);
