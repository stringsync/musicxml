import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<staff-lines>` element
 *
 * Parent element: `<staff-details>`
 *
 * The `<staff-lines>` element specifies the number of lines and is usually used for a non 5-line staff. If the
 * `<staff-lines>` element is present, the appearance of each line may be individually specified with a `<line-detail>`
 * element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/staff-lines/}
 */
export const StaffLines = schema('staff-lines', {}, [
  t.label({ label: 'value', value: t.required(dataTypes.nonNegativeInteger()) }),
] as const);
