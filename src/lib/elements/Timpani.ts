import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<timpani>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<timpani>` element represents the timpani pictogram.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/timpani/}
 */
export const Timpani = schema(
  'timpani',
  {
    /**
     * Distinguishes different SMuFL stylistic alternates.
     */
    smufl: t.optional(dataTypes.smuflPictogramGlyphName()),
  },
  [] as const
);
