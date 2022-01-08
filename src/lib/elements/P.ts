import { xml } from '../xml';

/**
 * The `<p>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<p>` element represents a piano dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/p/}
 */
export type P = ReturnType<typeof P>;

export const P = xml.element('p', { attributes: {}, content: [] as const }, {});
