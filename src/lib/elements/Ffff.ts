import { xml } from '../xml';

/**
 * The `<ffff>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<ffff>` element represents an ffff dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/ffff/}
 */
export type Ffff = ReturnType<typeof Ffff>;

export const Ffff = xml.element('ffff', { attributes: {}, content: [] as const }, {});
