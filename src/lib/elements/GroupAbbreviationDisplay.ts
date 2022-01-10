import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { AccidentalText } from './AccidentalText';
import { DisplayText } from './DisplayText';

/**
 * The `<group-abbreviation-display> element`
 *
 * Parent element: `<part-group>`
 *
 * The `<group-abbreviation-display> element is used for exact formatting of multi-font text in group abbreviations to
 * the left of the system. The print-object attribute can be used to determine what, if anything, is printed at the
 * start of each system.`
 *
 * Formatting specified in the `<group-abbreviation-display> element overrides formatting specified in the
 * `<group-abbreviation> element.`
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/group-abbreviation-display/}
 */
export type GroupAbbreviationDisplay = ReturnType<typeof GroupAbbreviationDisplay>;

export const GroupAbbreviationDisplay = xml.element(
  'group-abbreviation-display',
  {
    attributes: {
      /**
       * Specifies whether or not to print an object. It is yes if not specified.
       */
      ['print-object']: t.optional(dataTypes.yesNo()),
    },
    content: [t.zeroOrMore(t.choices(DisplayText, AccidentalText))] as const,
  },
  {}
);
