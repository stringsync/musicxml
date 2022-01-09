import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<staff-size>` element
 *
 * Parent element: `<staff-details>`
 *
 * The `<staff-size>` element indicates how large a staff space is on this staff, expressed as a percentage of the
 * work's default scaling. Values less than 100 make the staff space smaller while values over 100 make the staff space
 * larger. A `<staff-type>` of cue, ossia, or editorial implies a `<staff-size>` of less than 100, but the exact value
 * is implementation-dependent unless specified here. Staff size affects staff height only, not the relationship of the
 * staff to the left and right margins.
 *
 * In some cases, a `<staff-size>` different than 100 also scales the notation on the staff, such as with a cue staff.
 * In other cases, such as percussion staves, the lines may be more widely spaced without scaling the notation on the
 * staff. The scaling attribute allows these two cases to be distinguished.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/staff-size/}
 */
export type StaffSize = ReturnType<typeof StaffSize>;

export const StaffSize = xml.element(
  'staff-size',
  {
    attributes: {
      /**
       * Specifies the percentage scaling that applies to the notation. Values less that 100 make the notation smaller
       * while values over 100 make the notation larger.
       */
      scaling: t.optional(dataTypes.nonNegativeDecimal()),
    },
    content: [t.required(dataTypes.nonNegativeDecimal())] as const,
  },
  {}
);
