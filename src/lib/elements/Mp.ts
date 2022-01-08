import { xml } from '../xml';

/**
 * The `<mp>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<mp>` element represents a mezzo piano dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/mp/}
 */
export type Mp = ReturnType<typeof Mp>;

export const Mp = xml.element('mp', { attributes: {}, content: [] as const }, {});
