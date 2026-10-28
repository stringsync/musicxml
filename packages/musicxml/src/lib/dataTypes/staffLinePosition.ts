import { t } from '../schema';
/**
 * The staff-line-position type indicates the line position on a given staff. Staff lines are numbered from bottom to
 * top, with 1 being the bottom line on a staff. A staff-line-position value can extend beyond the range of the lines on
 * the current staff.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/staff-line-position/}
 */
export const staffLinePosition = () => t.label({ label: 'staff-line-position', value: t.int() });
