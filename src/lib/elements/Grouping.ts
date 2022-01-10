import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { Feature } from './Feature';

/**
 * The `<grouping>` element
 *
 * Parent elements: `<measure>` (partwise), `<part>` (timewise)
 *
 * The `<grouping>` element is used for musical analysis. When the type attribute is start or single, it usually
 * contains one or more <feature> elements. Feature elements contained within a stop type of grouping may be ignored.
 *
 * This element is flexible to allow for different types of analyses. Future versions of the MusicXML format may add
 * elements that can represent more standardized categories of analysis data, allowing for easier data sharing.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/grouping/}
 */
export type Grouping = ReturnType<typeof Grouping>;

export const Grouping = xml.element(
  'grouping',
  {
    attributes: {
      /**
       * Indicates if this is a single-note grouping, or the start or stop of a multi-note grouping.
       */
      type: t.required(dataTypes.startStopSingle()),

      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

      /**
       * Distinguishes which `<grouping>` elements are in which hierarchy.
       */
      ['member-of']: t.optional(dataTypes.token()),

      /**
       * Distinguishes between various overlapping and hierarchical groupings. The default value is 1.
       */
      number: t.optional(dataTypes.token()),
    },
    content: [t.zeroOrMore(Feature)] as const,
  },
  {}
);
