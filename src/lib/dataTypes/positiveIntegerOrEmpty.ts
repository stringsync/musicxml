import { t } from '../xml';

/**
 * The positive-integer-or-empty values can be either a positive integer or an empty string.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/positive-integer-or-empty/}
 */
export const positiveIntegerOrEmpty = () => t.choices('' as const, t.range({ min: 1, max: Number.POSITIVE_INFINITY }));
