import { t } from '../xml';

/**
 * The staff-number type indicates staff numbers within a multi-staff part. Staves are numbered from top to bottom, with
 * 1 being the top staff on a part.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/staff-number/}
 */
export const staffNumber = () => t.label({ label: 'staff-number', value: t.int({ min: 1 }) });
