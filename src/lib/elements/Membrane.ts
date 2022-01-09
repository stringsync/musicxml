import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<membrane>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<membrane>` element represents pictograms for membrane percussion instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/membrane/}
 */
export type Membrane = ReturnType<typeof Membrane>;

export const Membrane = xml.element(
  'membrane',
  {
    attributes: {
      /**
       * Distinguishes different SMuFL stylistic alternates.
       */
      smufl: t.optional(dataTypes.smuflPictogramGlyphName()),
    },
    content: [t.required(dataTypes.membraneValue())] as const,
  },
  {}
);
