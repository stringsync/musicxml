import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<metronome-type>` element
 *
 * Parent element: `<metronome-note>`
 *
 * The `<metronome-type>` element works like the `<type>` element in defining metric relationships.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/metronome-type/}
 */
export const MetronomeType = schema('metronome-type', {}, [t.required(dataTypes.noteTypeValue())] as const);
