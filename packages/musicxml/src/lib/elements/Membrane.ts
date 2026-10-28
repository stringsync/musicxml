import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<membrane>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<membrane>` element represents pictograms for membrane percussion instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/membrane/}
 */
export const Membrane = schema(
  'membrane',
  {
    /**
     * Distinguishes different SMuFL stylistic alternates.
     */
    smufl: t.optional(dataTypes.smuflPictogramGlyphName()),
  },
  [t.required(dataTypes.membraneValue())] as const
);
