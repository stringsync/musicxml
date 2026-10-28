import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<effect>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<effect>` element represents pictograms for sound effect percussion instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/effect/}
 */
export const Effect = schema(
  'effect',
  {
    /**
     * Distinguishes different SMuFL stylistic alternates.
     */
    smufl: t.optional(dataTypes.smuflPictogramGlyphName()),
  },
  [t.required(dataTypes.effectValue())] as const
);
