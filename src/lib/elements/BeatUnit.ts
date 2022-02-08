import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<beat-unit>` element
 *
 * Parent elements: `<beat-unit-tied>`, `<metronome>`
 *
 * The `<beat-unit>` element indicates the graphical note type to use in a metronome mark.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/beat-unit/}
 */
export const BeatUnit = schema('beat-unit', {}, [t.required(dataTypes.noteTypeValue())] as const);
