import { t, xml } from '../xml';

/**
 * Parent elements: `<score-part>`, `<score-partwise>`, `<score-timewise>`
 *
 * The `<identification>` element contains basic metadata about the score. It includes information that may apply at a
 * score-wide, movement-wide, or part-wide level. The `<creator>`, `<rights>`, `<source>`, and `<relation>` elements are
 * based on Dublin Core.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/identification/}
 */
export type Creator = ReturnType<typeof Creator>;

export const Creator = xml.element(
  'creator',
  {
    attributes: {
      type: t.optional(t.string()),
    },
    content: [t.string()],
  },
  {}
);