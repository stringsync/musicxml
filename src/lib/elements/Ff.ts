import { xml } from '../xml';

/**
 * The `<ff>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<ff>` element represents a fortissimo dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/ff/}
 */
export type Ff = ReturnType<typeof Ff>;

export const Ff = xml.element('ff', { attributes: {}, content: [] as const }, {});
