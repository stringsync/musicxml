import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<effect>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<effect>` element represents pictograms for sound effect percussion instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/effect/}
 */
export type Effect = ReturnType<typeof Effect>;

export const Effect = xml.element(
  'effect',
  {
    attributes: {
      /**
       * Distinguishes different SMuFL stylistic alternates.
       */
      smufl: t.optional(dataTypes.smuflPictogramGlyphName()),
    },
    content: [t.required(dataTypes.effectValue())] as const,
  },
  {}
);
