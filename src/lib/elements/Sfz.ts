import { xml } from '../xml';

/**
 * The `<sfz>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<sfz>` element represents a sforzando sfz dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/sfz/}
 */
export type Sfz = ReturnType<typeof Sfz>;

export const Sfz = xml.element('sfz', { attributes: {}, content: [] as const }, {});
