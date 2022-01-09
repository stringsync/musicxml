import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

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
export type StaffLines = ReturnType<typeof StaffLines>;

export const StaffLines = xml.element(
  'staff-lines',
  { attributes: {}, content: [t.required(dataTypes.nonNegativeInteger())] as const },
  {}
);
