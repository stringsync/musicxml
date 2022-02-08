import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<hole-shape>` element
 *
 * Parent element: `<hole>`
 *
 * The `<hole-shape>` element indicates the shape of the hole symbol. It is a circle if not specified.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/hole-shape/}
 */
export const HoleShape = schema('hole-shape', {}, [t.required(dataTypes.string())] as const);
