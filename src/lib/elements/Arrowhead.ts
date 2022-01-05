import { xml } from '../xml';

/**
 * The `<arrowhead>` element
 *
 * Parent element: `<arrow>`
 *
 * The presence of an `<arrowhead>` element indicates that only the arrowhead is displayed within the `<arrow>`, not the
 * arrow stem.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/arrowhead/}
 */
export type Arrowhead = ReturnType<typeof Arrowhead>;

export const Arrowhead = xml.element('arrowhead', { attributes: {}, content: [] as const }, {});
