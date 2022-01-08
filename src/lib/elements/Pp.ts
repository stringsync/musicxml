import { xml } from '../xml';

/**
 * The `<pp>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<pp>` element represents a pianissimo dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/pp/}
 */
export type Pp = ReturnType<typeof Pp>;

export const Pp = xml.element('pp', { attributes: {}, content: [] as const }, {});
