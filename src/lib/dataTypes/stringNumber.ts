import { t } from '../xml';

/**
 * The string-number type indicates a string number. Strings are numbered from high to low, with 1 being the highest
 * pitched full-length string.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/string-number/}
 */
export const stringNumber = () => t.range({ min: 1, max: Number.POSITIVE_INFINITY });
