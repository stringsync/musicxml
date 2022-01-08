import { xml } from '../xml';

/**
 * The `<fp>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<fp>` element represents a forte piano dynamic marking.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/fp/}
 */
export type Fp = ReturnType<typeof Fp>;

export const Fp = xml.element('fp', { attributes: {}, content: [] as const }, {});
