import { xml } from '../xml';

/**
 * The `<fffff>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<fffff>` element represents an fffff dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/fffff/}
 */
export type Fffff = ReturnType<typeof Fffff>;

export const Fffff = xml.element('fffff', { attributes: {}, content: [] as const }, {});
