import { xml } from '../xml';

/**
 * The `<ppppp>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<ppppp>` element represents a ppppp dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/ppppp/}
 */
export type Ppppp = ReturnType<typeof Ppppp>;

export const Ppppp = xml.element('ppppp', { attributes: {}, content: [] as const }, {});
