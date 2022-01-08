import { xml } from '../xml';

/**
 * The `<f>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<f>` element represents a forte dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/f/}
 */
export type F = ReturnType<typeof F>;

export const F = xml.element('f', { attributes: {}, content: [] as const }, {});
