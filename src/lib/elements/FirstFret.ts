import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<first-fret>` element
 *
 * Parent element: `<frame>`
 *
 * The `<first-fret>` element indicates which fret is shown in the top space of the frame; it is fret 1 if the element
 * is not present.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/first-fret/}
 */
export type FirstFret = ReturnType<typeof FirstFret>;

export const FirstFret = xml.element(
  'first-fret',
  {
    attributes: {
      /**
       * Indicates whether the text appears to the left or right of the frame.
       */
      location: t.optional(dataTypes.leftRight()),

      /**
       * Indicates how the first fret is represented in the fret diagram.
       */
      text: t.optional(dataTypes.token()),
    },
    content: [t.required(dataTypes.positiveInteger())] as const,
  },
  {}
);
