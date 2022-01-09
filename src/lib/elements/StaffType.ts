import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The <staff-type> element
 *
 * Parent element: <staff-details>
 *
 * The <staff-type> element specifies different uses for the staff, as listed in the staff-type data type.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/staff-type/}
 */
export type StaffType = ReturnType<typeof StaffType>;

export const StaffType = xml.element(
  'staff-type',
  { attributes: {}, content: [t.required(dataTypes.staffType())] as const },
  {}
);
