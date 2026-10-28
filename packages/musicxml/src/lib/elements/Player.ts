import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<player>` element
 *
 * Parent element: `<score-part>`
 *
 * The `<player>` element allows for multiple players per `<score-part>` for use in listening applications. One player
 * may play multiple instruments, while a single instrument may include multiple players in divisi sections.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/player/}
 */
export const Player = schema(
  'player',
  {
    /**
     * An identifier for this `<player>` that is unique within this document.
     */
    id: t.required(dataTypes.id()),
  },
  [] as const
);
