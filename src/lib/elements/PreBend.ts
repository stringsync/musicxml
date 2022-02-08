import { schema } from '../schema';

/**
 * The `<pre-bend> element
 *
 * Parent element: `<bend>
 *
 * The `<pre-bend> element indicates that a bend is a pre-bend rather than a normal bend or a release.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/pre-bend/}
 */
export const PreBend = schema('pre-bend', {}, [] as const);
