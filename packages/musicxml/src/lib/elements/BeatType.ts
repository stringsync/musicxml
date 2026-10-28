import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<beat-type>` element
 *
 * Parent elements: `<interchangeable>`, `<time>`
 *
 * The `<beat-type>` element indicates the beat unit, as found in the denominator of a time signature.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/beat-type/}
 */
export const BeatType = schema('beat-type', {}, [t.required(dataTypes.string())] as const);
