import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<hole-type>` element
 *
 * Parent element: `<hole>`
 *
 * The content of the `<hole-type>` element indicates what the hole symbol represents in terms of instrument fingering
 * or other techniques.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/hole-type/}
 */
export const HoleType = schema('hole-type', {}, [t.required(dataTypes.string())] as const);
