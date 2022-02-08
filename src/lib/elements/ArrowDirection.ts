import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<arrow-direction>` element
 *
 * Parent element: `<arrow>`
 *
 * The `<arrow-direction>` element represents the direction in which an arrow points, using Unicode arrow terminology.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/arrow-direction/}
 */
export const ArrowDirection = schema('arrow-direction', {}, [t.required(dataTypes.arrowDirection())] as const);
