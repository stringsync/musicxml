import { xml } from '../xml';

/**
 * The `<ffffff>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<ffffff>` element represents an ffffff dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/ffffff/}
 */
export type Ffffff = ReturnType<typeof Ffffff>;

export const Ffffff = xml.element('ffffff', { attributes: {}, content: [] as const }, {});
