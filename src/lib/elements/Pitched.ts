import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<pitched>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<pitched>` element represents pictograms for pitched percussion instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/pitched/}
 */
export const Pitched = schema(
  'pitched',
  {
    /**
     * Distinguishes different SMuFL glyphs for a particular pictogram within the
     * [Tuned mallet percussion pictograms](https://www.w3.org/2021/03/smufl14/tables/tuned-mallet-percussion-pictograms.html)
     * range.
     */
    smufl: t.optional(dataTypes.smuflPictogramGlyphName()),
  },
  [] as const
);
