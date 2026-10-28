import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<line>` element
 *
 * Parent elements: `<clef>`, `<part-clef>`
 *
 * Line numbers are counted from the bottom of the staff. They are only needed with the G, F, and C signs in order to
 * position a pitch correctly on the staff. Standard values are 2 for the G sign (treble clef), 4 for the F sign (bass
 *  clef), and 3 for the C sign (alto clef). Line values can be used to specify positions outside the staff, such as a
 * C clef positioned in the middle of a grand staff.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/line/}
 */
export const Line = schema('line', {}, [t.required(dataTypes.staffLinePosition())] as const);
