import { xml } from '../xml';

/**
 * The `<natural>` element
 *
 * Parent element: `<harmonic>`
 *
 * The `<natural>` element indicates that this is a natural harmonic. These are usually notated at base pitch rather
 * than sounding pitch.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/natural/}
 */
export type Natural = ReturnType<typeof Natural>;

export const Natural = xml.element('natural', { attributes: {}, content: [] as const }, {});
