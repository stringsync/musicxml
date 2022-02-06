import { t } from '../xml';

/**
 * The positive-divisions type restricts divisions values to positive numbers.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/positive-divisions/}
 */
export const positiveDivisions = () => t.label({ label: 'positive-divisions', value: t.float({ min: 1 }) });
