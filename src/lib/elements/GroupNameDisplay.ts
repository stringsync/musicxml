import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { AccidentalText } from './AccidentalText';
import { DisplayText } from './DisplayText';

/**
 * The `<group-name-display>` element
 *
 * Parent element: `<part-group>`
 *
 * The `<group-name-display>` element is used for exact formatting of multi-font text in group names to the left of the
 * system. The print-object attribute can be used to determine what, if anything, is printed at the start of each
 * system.
 *
 * Formatting specified in the `<group-name-display>` element overrides formatting specified in the `<group-name>`
 * element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/group-name-display/}
 */
export type GroupNameDisplay = ReturnType<typeof GroupNameDisplay>;

export const GroupNameDisplay = xml.element(
  'group-name-display',
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
