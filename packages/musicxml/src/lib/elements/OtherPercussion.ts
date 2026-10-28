import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<other-percussion>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<other-percussion>` element represents percussion pictograms not defined elsewhere.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/other-percussion/}
 */
export const OtherPercussion = schema(
  'other-percussion',
  {
    /**
     * Indicates a particular Standard Music Font Layout (SMuFL) character using its canonical glyph name. Sometimes this
     * is a formatting choice, and sometimes this is a refinement of the semantic meaning of an element.
     */
    smufl: t.optional(dataTypes.smuflGlyphName()),
  },
  [t.required(dataTypes.string())] as const
);
