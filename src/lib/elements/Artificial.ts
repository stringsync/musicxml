import { xml } from '../xml';

/**
 * The `<artificial>` element
 *
 * Parent element: `<harmonic>`
 *
 * The `<artificial>` element indicates that this is an artificial harmonic.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/artificial/}
 */
export type Artificial = ReturnType<typeof Artificial>;

export const Artificial = xml.element('artificial', { attributes: {}, content: [] as const }, {});
