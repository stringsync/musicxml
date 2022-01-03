import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

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
export type Player = ReturnType<typeof Player>;

export const Player = xml.element(
  'player',
  {
    attributes: {
      /**
       * An identifier for this `<player>` that is unique within this document.
       */
      id: t.required(dataTypes.id()),
    },
    content: [] as const,
  },
  {}
);
