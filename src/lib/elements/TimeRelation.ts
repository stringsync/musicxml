import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

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
export type TimeRelation = ReturnType<typeof TimeRelation>;

export const TimeRelation = xml.element(
  'time-relation',
  { attributes: {}, content: [t.required(dataTypes.timeRelation())] as const },
  {}
);
