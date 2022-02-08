import { schema } from '../schema';

/**
 * The `<accordion-middle>` element
 *
 * Parent element: `<accordion-registration>`
 *
 * The `<accordion-middle>` element indicates the presence of 1 to 3 dots in the middle (8') section of the registration
 * symbol. This element is omitted if no dots are present.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/accordion-middle/}
 */
export const AccordionMiddle = schema('accordion-middle', {}, [] as const);
