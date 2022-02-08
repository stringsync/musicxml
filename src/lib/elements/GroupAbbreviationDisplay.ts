import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
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
export const GroupAbbreviationDisplay = schema(
  'group-abbreviation-display',
  {
    /**
     * Specifies whether or not to print an object. It is yes if not specified.
     */
    ['print-object']: t.optional(dataTypes.yesNo()),
  },
  [t.label({ label: 'texts', value: t.zeroOrMore(t.choices(DisplayText, AccidentalText)) })] as const
);
