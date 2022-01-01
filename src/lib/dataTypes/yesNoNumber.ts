import { t } from '../xml';

/**
 * The yes-no-number type is used for attributes that can be either boolean or numeric values.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/yes-no-number/}
 */
export const yesNoNumber = () => t.choices('no' as const, 'yes' as const, 0 as const, 1 as const);
