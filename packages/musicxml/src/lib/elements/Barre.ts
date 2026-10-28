import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<barre>` element
 *
 * Parent element: `<frame-note>`
 *
 * The `<barre>` element indicates placing a finger over multiple strings on a single fret.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/barre/}
 */
export const Barre = schema(
  'barre',
  {
    /**
     * The start value indicates the lowest pitched string (e.g., the string with the highest MusicXML number). The stop
     * value indicates the highest pitched string.
     */
    type: t.required(dataTypes.startStop()),

    /**
     * Indicates the color of an element.
     */
    color: t.optional(dataTypes.color()),
  },
  [] as const
);
