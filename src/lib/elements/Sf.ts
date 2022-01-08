import { xml } from '../xml';

/**
 * The `<sf>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<sf>` element represents a sforzando sf dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/sf/}
 */
export type Sf = ReturnType<typeof Sf>;

export const Sf = xml.element('sf', { attributes: {}, content: [] as const }, {});
