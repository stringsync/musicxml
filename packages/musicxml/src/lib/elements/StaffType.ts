import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The <staff-type> element
 *
 * Parent element: <staff-details>
 *
 * The <staff-type> element specifies different uses for the staff, as listed in the staff-type data type.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/staff-type/}
 */
export const StaffType = schema('staff-type', {}, [t.required(dataTypes.staffType())] as const);
