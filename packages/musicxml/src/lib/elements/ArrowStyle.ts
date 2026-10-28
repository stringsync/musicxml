import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<arrow-style>` element
 *
 * Parent element: `<arrow>`
 *
 * The `<arrow-style>` element represents the style of an arrow, using Unicode arrow terminology.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/arrow-style/}
 */
export const ArrowStyle = schema('arrow-style', {}, [t.required(dataTypes.arrowStyle())] as const);
