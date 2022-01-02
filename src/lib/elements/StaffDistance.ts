import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

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
export type StaffDistance = ReturnType<typeof StaffDistance>;

export const StaffDistance = xml.element(
  'staff-distance',
  { attributes: {}, content: [t.required(dataTypes.tenths())] as const },
  {}
);
