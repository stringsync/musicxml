import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<metronome-relation>` element
 *
 * Parent element: `<metronome>`
 *
 * The `<metronome-relation>` element describes the relationship symbol that goes between the two sets of
 * `<metronome-note>` elements. The currently allowed value is equals, but this may expand in future versions. If the
 * element is empty, the equals value is used.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/metronome-relation/}
 */
export const MetronomeRelation = schema('metronome-relation', {}, [t.optional(dataTypes.string())] as const);
