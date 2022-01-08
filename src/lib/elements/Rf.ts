import { xml } from '../xml';

/**
 * The `<rf>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<rf>` element represents a rinforzando rf dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/rf/}
 */
export type Rf = ReturnType<typeof Rf>;

export const Rf = xml.element('rf', { attributes: {}, content: [] as const }, {});
