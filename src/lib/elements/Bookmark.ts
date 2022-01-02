import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<bookmark>` element
 *
 * Parent elements: `<credit>`, `<measure>` (partwise), `<part>` (timewise)
 *
 * The `<bookmark>` element serves as a well-defined target for an incoming simple XLink.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/bookmark/}
 */
export type Bookmark = ReturnType<typeof Bookmark>;

export const Bookmark = xml.element(
  'bookmark',
  {
    attributes: {
      /**
       * The identifier for this bookmark, unique within this document.
       */
      id: t.required(dataTypes.id()),

      /**
       * The element attribute specifies an element type for a descendant of the next sibling element that is not a
       * `<link>` or `<bookmark>` element. When not present, the `<bookmark>` or `<link>` element refers to the next
       * sibling element in the MusicXML file.
       */
      element: t.optional(dataTypes.nmtoken()),

      /**
       * The name for this bookmark.
       */
      name: t.optional(dataTypes.token()),

      /**
       * The position attribute specifies the position of the descendant element specified by the element attribute,
       * where the first position is 1. The position attribute is ignored if the element attribute is not present.
       *
       * For instance, an element value of "beam" and a position value of "2" defines the `<link>` or `<bookmark>` to
       * refer to the second beam descendant of the next sibling element that is not a <link> or <bookmark> element.
       * This is equivalent to an XPath test of [.//beam[2]] done in the context of the sibling element.
       */
      position: t.optional(dataTypes.positiveInteger()),
    },
    content: [] as const,
  },
  {}
);
