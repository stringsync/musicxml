import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<metal>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<metal>` element represents pictograms for metal percussion instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/metal/}
 */
export const Metal = schema(
  'metal',
  {
    /**
     * Distinguishes different SMuFL stylistic alternates.
     */
    smufl: t.optional(dataTypes.smuflPictogramGlyphName()),
  },
  [t.required(dataTypes.metalValue())] as const
);
