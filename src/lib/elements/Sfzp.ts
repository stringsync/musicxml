import { xml } from '../xml';

/**
 * The `<sfzp>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<sfzp>` element represents a sforzando piano sfzp dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/sfzp/}
 */
export type Sfzp = ReturnType<typeof Sfzp>;

export const Sfzp = xml.element('sfzp', { attributes: {}, content: [] as const }, {});
