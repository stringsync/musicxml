import { xml } from '../xml';

/**
 * The `<ppp>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<ppp>` element represents a triple piano dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/ppp/}
 */
export type Ppp = ReturnType<typeof Ppp>;

export const Ppp = xml.element('ppp', { attributes: {}, content: [] as const }, {});
