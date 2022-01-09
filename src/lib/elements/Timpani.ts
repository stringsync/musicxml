import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<timpani>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<timpani>` element represents the timpani pictogram.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/timpani/}
 */
export type Timpani = ReturnType<typeof Timpani>;

export const Timpani = xml.element(
  'timpani',
  {
    attributes: {
      /**
       * Distinguishes different SMuFL stylistic alternates.
       */
      smufl: t.optional(dataTypes.smuflPictogramGlyphName()),
    },
    content: [] as const,
  },
  {}
);
