import * as dataTypes from '../dataTypes';
import { schema } from '../schema';

/**
 * The `<movement-number>` element
 *
 * Parent elements: `<score-partwise version="4.0">`, `<score-timewise>`
 *
 * The `<movement-number>` element specifies the number of a movement.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/movement-number/}
 */
export const MovementNumber = schema('movement-number', {}, [dataTypes.string()] as const);
