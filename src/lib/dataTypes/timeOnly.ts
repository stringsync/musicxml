import { t } from '../schema';
/**
 * The time-only type is used to indicate that a particular playback- or listening-related element only applies
 * particular times through a repeated section. The value is a comma-separated list of positive integers arranged in
 * ascending order, indicating which times through the repeated section that the element applies.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/time-only/}
 */
export const timeOnly = () => t.regex({ pattern: /[1-9][0-9]*(, ?[1-9][0-9]*)*/, zero: '1' });
