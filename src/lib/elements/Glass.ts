import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<glass>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<glass>` element represents pictograms for glass percussion instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/glass/}
 */
export const Glass = schema(
  'glass',
  {
    /**
     * Distinguishes different SMuFL glyphs for wind chimes in the Chimes pictograms range, including those made of
     * materials other than glass.
     */
    smufl: t.optional(dataTypes.smuflPictogramGlyphName()),
  },
  [t.required(dataTypes.glassValue())] as const
);
