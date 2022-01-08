import { xml } from '../xml';

/**
 * The `<rfz>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<rfz>` element represents a rinforzando rfz dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/rfz/}
 */
export type Rfz = ReturnType<typeof Rfz>;

export const Rfz = xml.element('rfz', { attributes: {}, content: [] as const }, {});
