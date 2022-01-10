import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { Footnote } from './Footnote';
import { GroupAbbreviation } from './GroupAbbreviation';
import { GroupAbbreviationDisplay } from './GroupAbbreviationDisplay';
import { GroupBarline } from './GroupBarline';
import { GroupName } from './GroupName';
import { GroupNameDisplay } from './GroupNameDisplay';
import { GroupSymbol } from './GroupSymbol';
import { GroupTime } from './GroupTime';
import { Level } from './Level';

/**
 * The `<part-list>` element
 *
 * Parent elements: `<score-partwise>`, `<score-timewise>`
 *
 * The `<part-list>` element identifies the different musical parts in this document. Each part has an ID that is used
 * later within the musical data. Since parts may be encoded separately and combined later, identification elements are
 * present at both the score and `<score-part>` levels.
 *
 * There must be at least one `<score-part>`, combined as desired with `<part-group>` elements that indicate braces and
 * brackets. Parts are ordered from top to bottom in a score based on the order in which they appear in the
 * `<part-list>`.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/part-list/}
 */
export type PartGroup = ReturnType<typeof PartGroup>;

export const PartGroup = xml.element(
  'part-group',
  {
    attributes: {
      /**
       * Indicates the start or stop of the `<part-group>`.
       */
      type: t.required(dataTypes.startStop()),

      /**
       * Distinguishes overlapping and nested `<part-group>` elements, not a sequence of `<part-group>` elements. The
       * default value is 1.
       */
      number: t.optional(dataTypes.token()),
    },
    content: [
      t.optional(GroupName),
      t.optional(GroupNameDisplay),
      t.optional(GroupAbbreviation),
      t.optional(GroupAbbreviationDisplay),
      t.optional(GroupSymbol),
      t.optional(GroupBarline),
      t.optional(GroupTime),
      t.optional(Footnote),
      t.optional(Level),
    ] as const,
  },
  {}
);
