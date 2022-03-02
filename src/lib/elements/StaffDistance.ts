import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<staff-distance>` element
 *
 * Parent element: `<staff-layout>`
 *
 * The `<staff-distance> element represents the vertical distance from the bottom line of the previous staff in this
 * system to the top line of the current staff.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/staff-distance/}
 */
export const StaffDistance = schema('staff-distance', {}, [
  t.label({ label: 'staff-distance-value', value: t.required(dataTypes.tenths()) }),
] as const);
