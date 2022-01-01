import { t } from '../xml';

/**
 * The ending-number type is used to specify either a comma-separated list of positive integers without leading zeros,
 * or a string of zero or more spaces. It is used for the number attribute of the `<ending>` element. The zero or more
 * spaces version is used when software knows that an ending is present, but cannot determine the type of the ending.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/ending-number/}
 */
export const endingNumber = () => t.regex({ pattern: /([ ]*)|([1-9][0-9]*(, ?[1-9][0-9]*)*)/, zero: () => '' });
