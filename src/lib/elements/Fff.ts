import { xml } from '../xml';

/**
 * The `<fff>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<fff>` element represents a triple forte dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/fff/}
 */
export type Fff = ReturnType<typeof Fff>;

export const Fff = xml.element('fff', { attributes: {}, content: [] as const }, {});
