import { t } from '../xml';

/**
 * The measure-numbering-value type describes how measure numbers are displayed on this part: no numbers, numbers every
 * measure, or numbers every system.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/measure-numbering-value/}
 */
export const measureNumberValue = () => t.choices(...(['none', 'measure', 'system'] as const));
