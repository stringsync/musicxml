import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<wood>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<wood>` element represents pictograms for wood percussion instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/wood/}
 */
export const Wood = schema(
  'wood',
  {
    /**
     * Distinguishes different SMuFL stylistic alternates.
     */
    smufl: t.optional(dataTypes.smuflPictogramGlyphName()),
  },
  [t.required(dataTypes.woodValue())] as const
);
