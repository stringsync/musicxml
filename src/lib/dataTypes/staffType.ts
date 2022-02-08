import { t } from '../schema';
/**
 * The staff-type value specifies different uses for the staff.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/staff-type/}
 */
export const staffType = () =>
  t.label({
    label: 'staff-type',
    value: t.choices(...(['regular', 'alternate', 'cue', 'editorial', 'ossia'] as const)),
  });
