import { xml } from '../xml';

/**
 * The `<n>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<n>` element represents a niente dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/n/}
 */
export type N = ReturnType<typeof N>;

export const N = xml.element('n', { attributes: {}, content: [] as const }, {});
