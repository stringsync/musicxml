import { xml } from '../xml';

/**
 * The `<sfpp>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<sfpp>` element represents a sforzando pianissimo sfpp dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/sfpp/}
 */
export type Sfpp = ReturnType<typeof Sfpp>;

export const Sfpp = xml.element('sfpp', { attributes: {}, content: [] as const }, {});
