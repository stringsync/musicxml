import { schema } from '../schema';

/**
 * The `<accordion-low>` element
 *
 * Parent element: `<accordion-registration>`
 *
 * The `<accordion-low>` element indicates the presence of a dot in the low (16') section of the registration symbol.
 * This element is omitted if no dot is present.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/accordion-low/}
 */
export const AccordionLow = schema('accordion-low', {}, [] as const);
