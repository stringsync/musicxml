import { xml } from '../xml';

/**
 * The `<fz>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<fz>` element represents a forzando fz dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/fz/}
 */
export type Fz = ReturnType<typeof Fz>;

export const Fz = xml.element('fz', { attributes: {}, content: [] as const }, {});
