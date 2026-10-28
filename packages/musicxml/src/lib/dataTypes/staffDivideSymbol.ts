import { t } from '../schema';
/**
 * The staff-divide-symbol type is used for staff division symbols. The down, up, and up-down values correspond to SMuFL
 * code points U+E00B, U+E00C, and U+E00D respectively.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/staff-divide-symbol/}
 */
export const staffDivideSymbol = () => t.choices('down' as const, 'up' as const, 'up-down' as const);
