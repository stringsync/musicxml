import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<time-relation>` element
 *
 * Parent element: `<interchangeable>`
 *
 * The `<time-relation>` element indicates the symbol used to represent the interchangeable aspect of dual time
 * signatures, as specified in the time-relation type.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/time-relation/}
 */
export const TimeRelation = schema('time-relation', {}, [t.required(dataTypes.timeRelation())] as const);
