import { t, xml } from '../xml';

/**
 * The `<relation>` element
 *
 * Parent element: `<identification>`
 *
 * The `<relation>` element describes a related resource for the music that is encoded. This is similar to the [Dublin
 * Core relation element](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/elements11/relation/).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/relation/}
 */
export type Relation = ReturnType<typeof Relation>;

export const Relation = xml.element(
  'relation',
  {
    attributes: {
      /**
       * Standard type values are music, words, and arrangement, but other types may be used.
       */
      type: t.optional(t.string()),
    },
    content: [] as const,
  },
  {}
);
