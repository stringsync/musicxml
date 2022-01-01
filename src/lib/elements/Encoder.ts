import { t, xml } from '../xml';
/**
 * Parent element: `<encoding>`
 *
 * The `<encoder>` element contains information about who did the digital encoding.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/encoder/}
 */
export type Encoder = ReturnType<typeof Encoder>;

export const Encoder = xml.element(
  'encoder',
  {
    attributes: {
      /**
       * Standard values are music, words, and arrangement, but other types may be used. This attribute is only needed
       * when there are multiple `<encoder>` elements.
       */
      type: t.string(),
    },
    content: [t.string()] as const,
  },
  {}
);
