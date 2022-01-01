import { t } from '../xml';

/**
 * The staff-line type indicates the line on a given staff. Staff lines are numbered from bottom to top, with 1 being
 * the bottom line on a staff.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/staff-line/}
 */
export const staffLine = () => t.range({ min: 1, max: Number.POSITIVE_INFINITY });
