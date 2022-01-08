import { xml } from '../xml';

/**
 * The `<pf>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<pf>` element represents a piano forte dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/pf/}
 */
export type Pf = ReturnType<typeof Pf>;

export const Pf = xml.element('pf', { attributes: {}, content: [] as const }, {});
