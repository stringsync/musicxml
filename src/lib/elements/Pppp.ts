import { xml } from '../xml';

/**
 * The `<pppp>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<pppp>` element represents a pppp dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/pppp/}
 */
export type Pppp = ReturnType<typeof Pppp>;

export const Pppp = xml.element('pppp', { attributes: {}, content: [] as const }, {});
