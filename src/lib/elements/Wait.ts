import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<wait>` element
 *
 * Parent element: `<listen>`
 *
 * The `<wait>` element specifies a point where the accompaniment should wait for a performer event before continuing.
 * This typically happens at the start of new sections or after a held note or indeterminate music. These waiting points
 * cannot always be inferred reliably from the contents of the displayed score.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/wait/}
 */
export const Wait = schema(
  'wait',
  {
    /**
     * Restricts the `<wait>` to apply to a single player.
     */
    player: t.optional(dataTypes.idref()),

    /**
     * Restricts the `<wait>` to apply to a set of times through a repeated section.
     */
    ['time-only']: t.optional(dataTypes.timeOnly()),
  },
  [] as const
);
