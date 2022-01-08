import { xml } from '../xml';

/**
 * The `<pppppp>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<pppppp>` element represents a pppppp dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/pppppp/}
 */
export type Pppppp = ReturnType<typeof Pppppp>;

export const Pppppp = xml.element('pppppp', { attributes: {}, content: [] as const }, {});
