import { schema } from '../schema';

/**
 * The `<mp>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<mp>` element represents a mezzo piano dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/mp/}
 */
export const Mp = schema('mp', {}, [] as const);
