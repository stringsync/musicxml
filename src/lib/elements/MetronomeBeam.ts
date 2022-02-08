import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<metronome-beam>` element
 *
 * Parent element: `<metronome-note>`
 *
 * The `<metronome-beam>` element works like the `<beam>` element in defining metric relationships, but does not include
 * all the attributes available in the `<beam>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/metronome-beam/}
 */
export const MetronomeBeam = schema(
  'metronome-beam',
  {
    /**
     * Indicates eighth note through 1024th note beams using number values 1 thru 8 respectively. The default value is
     * 1.
     */
    number: t.optional(dataTypes.beamLevel()),
  },
  [t.required(dataTypes.beamValue())] as const
);
