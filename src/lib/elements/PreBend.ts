import { xml } from '../xml';

/**
 * The `<pre-bend> element
 *
 * Parent element: `<bend>
 *
 * The `<pre-bend> element indicates that a bend is a pre-bend rather than a normal bend or a release.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/pre-bend/}
 */
export type PreBend = ReturnType<typeof PreBend>;

export const PreBend = xml.element('pre-bend', { attributes: {}, content: [] as const }, {});
