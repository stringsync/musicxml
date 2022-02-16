import { t } from '../schema';
/**
 * The non-negative-decimal type specifies a non-negative decimal value.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/non-negative-decimal/}
 */
export const nonNegativeDecimal = () => t.float({ min: 0 });
