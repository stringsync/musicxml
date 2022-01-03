import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
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
export type PartNameDisplay = ReturnType<typeof PartNameDisplay>;

export const PartNameDisplay = xml.element(
  'part-name-display',
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
