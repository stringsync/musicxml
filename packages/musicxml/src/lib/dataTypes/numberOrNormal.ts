import { t } from '../schema';
/**
 * The number-or-normal values can be either a decimal number or the string "normal". This is used by the line-height
 * and letter-spacing attributes.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/number-or-normal/}
 */
export const numberOrNormal = () => t.choices('normal' as const, t.float());
