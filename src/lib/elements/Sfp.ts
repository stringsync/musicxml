import { xml } from '../xml';

/**
 * The `<sfp>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<sfp>` element represents a sforzando piano sfp dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/sfp/}
 */
export type Sfp = ReturnType<typeof Sfp>;

export const Sfp = xml.element('sfp', { attributes: {}, content: [] as const }, {});
