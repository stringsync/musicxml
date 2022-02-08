import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<metronome-tied>` element
 *
 * Parent element: `<metronome-note>`
 *
 * The `<metronome-tied>` element indicates the presence of a tie within a metric relationship mark. As with the
 * `<tied>` element, both the start and stop of the tie should be specified, in this case within separate
 * `<metronome-note>` elements.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/metronome-tied/}
 */
export const MetronomeTied = schema(
  'metronome-tied',
  {
    /**
     * Indicates if this is the start or stop of the tie.
     */
    type: t.required(dataTypes.startStop()),
  },
  [] as const
);
