import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<measure-distance>` element
 *
 * Parent element: `<measure-layout>`
 *
 * The `<measure-distance>` element specifies the horizontal distance from the previous measure. This value is only used
 * for systems where there is horizontal whitespace in the middle of a system, as in systems with codas. To specify the
 * measure width, use the width attribute of the `<measure>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/measure-distance/}
 */
export const MeasureDistance = schema('measure-distance', {}, [
  t.label({ label: 'value', value: t.required(dataTypes.tenths()) }),
] as const);
