import { t } from '../schema';
/**
 * The numeral-value type represents a Roman numeral or Nashville number value as a positive integer from 1 to 7.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/numeral-value/}
 */
export const numeralValue = () => t.label({ label: 'numeral-value', value: t.int({ min: 1, max: 7 }) });
