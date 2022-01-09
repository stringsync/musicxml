import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<metal>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<metal>` element represents pictograms for metal percussion instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/metal/}
 */
export type Metal = ReturnType<typeof Metal>;

export const Metal = xml.element(
  'metal',
  {
    attributes: {
      /**
       * Distinguishes different SMuFL stylistic alternates.
       */
      smufl: t.optional(dataTypes.smuflPictogramGlyphName()),
    },
    content: [t.required(dataTypes.metalValue())] as const,
  },
  {}
);
