import { t } from '../xml';

/**
 * The accordion-middle type may have values of 1, 2, or 3, corresponding to having 1 to 3 dots in the middle section of
 * the accordion registration symbol. This type is not used if no dots are present.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/accordion-middle/}
 */
export const accordionMiddle = () => t.range(1, 3);
