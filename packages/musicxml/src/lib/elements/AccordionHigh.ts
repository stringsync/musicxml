import { schema } from '../schema';

/**
 * The `<accordion-high>` element
 *
 * Parent element: `<accordion-registration>`
 *
 * The `<accordion-high>` element indicates the presence of a dot in the high (4') section of the registration symbol.
 * This element is omitted if no dot is present.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/accordion-high/}
 */
export const AccordionHigh = schema('accordion-high', {}, [] as const);
