import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { AccidentalText } from './AccidentalText';
import { DisplayText } from './DisplayText';

/**
 * The `<part-name-display>` element
 *
 * Parent elements: `<print>`, `<score-part>`
 *
 * The `<part-name-display>` element is used for exact formatting of multi-font text in part names to the left of the
 * system. The print-object attribute can be used to determine what, if anything, is printed at the start of each system.
 *
 * Formatting specified in the `<part-name-display>` element overrides formatting specified in the <part-name> element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/part-name-display/}
 */
export const PartNameDisplay = schema(
  'part-name-display',
  {
    /**
     * Specifies whether or not to print an object. It is yes if not specified.
     */
    ['print-object']: t.optional(dataTypes.yesNo()),
  },
  [t.label({ label: 'texts', value: t.zeroOrMore(t.choices(DisplayText, AccidentalText)) })] as const
);
