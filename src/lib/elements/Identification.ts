import { element } from '../xml';

export type Identification = ReturnType<typeof Identification>;

/**
 * Parent elements: `<score-part>`, `<score-partwise>`, `<score-timewise>`
 *
 * The `<identification>` element contains basic metadata about the score. It includes information that may apply at a
 * score-wide, movement-wide, or part-wide level. The `<creator>`, `<rights>`, `<source>`, and `<relation>` elements are
 * based on Dublin Core.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/identification/}
 */
export const Identification = element('identification', {
  attributes: {},
  content: [],
});
