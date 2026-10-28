import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<circular-arrow>` element
 *
 * Parent element: `<arrow>`
 *
 * The `<circular-arrow>` element represents a circular arrow, using Unicode arrow terminology to specify the arrow
 * direction.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/circular-arrow/}
 */
export const CircularArrow = schema('circular-arrow', {}, [t.required(dataTypes.circularArrow())] as const);
