import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<creator>` element
 *
 * Parent elements: `<score-part>`, `<score-partwise version="4.0">`, `<score-timewise>`
 *
 * The `<identification>` element contains basic metadata about the score. It includes information that may apply at a
 * score-wide, movement-wide, or part-wide level. The `<creator>`, `<rights>`, `<source>`, and `<relation>` elements are
 * based on Dublin Core.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/identification/}
 */
export const Creator = schema(
  'creator',
  {
    /**
     * Distinguishes different creative contributions. Thus there can be multiple `<creator>` elements within an
     * `<identification>` element. Standard values are composer, lyricist, and arranger. Other values may be used for
     * different types of creative roles. This attribute should usually be used even if there is just a single
     * `<creator>` element.
     */
    type: t.optional(dataTypes.string()),
  },
  [t.required(dataTypes.token())] as const
);
