import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<other-listen>` element
 *
 * Parent element: `<listen>`
 *
 * The `<other-listen>` element represents other types of listening control and interaction that are specific to a note.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/other-listen/}
 */
export const OtherListen = schema(
  'other-listen',
  {
    /**
     * Indicates the type of listening to which the element content applies.
     */
    type: t.required(dataTypes.token()),

    /**
     * Restricts the element to apply to a single player.
     */
    player: t.optional(dataTypes.idref()),

    /**
     * Restrict the element to apply to a set of times through a repeated section.
     */
    ['time-only']: t.optional(dataTypes.timeOnly()),
  },
  [t.required(dataTypes.string())] as const
);
