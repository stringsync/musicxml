import { t } from '../xml';

/**
 * The number-of-lines type is used to specify the number of lines in text decoration attributes.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/number-of-lines/}
 */
export const numberOfLines = () => t.range({ min: 0, max: 3 });
