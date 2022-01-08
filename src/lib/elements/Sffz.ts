import { xml } from '../xml';

/**
 * The `<sffz>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<sffz>` element represents a sforzando sffz dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/sffz/}
 */
export type Sffz = ReturnType<typeof Sffz>;

export const Sffz = xml.element('sffz', { attributes: {}, content: [] as const }, {});
