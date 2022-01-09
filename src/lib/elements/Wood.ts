import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<wood>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<wood>` element represents pictograms for wood percussion instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/wood/}
 */
export type Wood = ReturnType<typeof Wood>;

export const Wood = xml.element(
  'wood',
  {
    attributes: {
      /**
       * Distinguishes different SMuFL stylistic alternates.
       */
      smufl: t.optional(dataTypes.smuflPictogramGlyphName()),
    },
    content: [t.required(dataTypes.woodValue())] as const,
  },
  {}
);
