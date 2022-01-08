import { xml } from '../xml';

/**
 * The `<mf>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<mf>` element represents a mezzo forte dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/mf/}
 */
export type Mf = ReturnType<typeof Mf>;

export const Mf = xml.element('mf', { attributes: {}, content: [] as const }, {});
