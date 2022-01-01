import { t, xml } from '../xml';

/**
 * Parent element: `<identification>`
 *
 * The `<source>` element describes the source for the music that is encoded. This is similar to the [Dublin Core source
 * element](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/elements11/source/).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/source/}
 */
export type Source = ReturnType<typeof Source>;

export const Source = xml.element('source', { attributes: {}, content: [t.string()] as const }, {});
