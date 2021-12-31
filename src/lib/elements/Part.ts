import { xml } from '../xml';

export type Part = ReturnType<typeof Part>;

/**
 * Parent element: `<score-partwise>`
 *
 * The `<part>` element is the top level of musical organization below the `<score-partwise>` document element. It
 * contains a sequence of `<measure>` elements.
 *
 *  {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/part-partwise/}
 */
export const Part = xml.element(
  'part',
  {
    attributes: {},
    content: [],
  },
  {}
);
