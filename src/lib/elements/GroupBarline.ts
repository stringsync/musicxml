import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<group-barline>` element
 *
 * Parent element: `<part-group>`
 *
 * The `<group-barline>` element indicates if the group should have common barlines.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/group-barline/}
 */
export type GroupBarline = ReturnType<typeof GroupBarline>;

export const GroupBarline = xml.element(
  'group-barline',
  {
    attributes: {
      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),
    },
    content: [t.required(dataTypes.groupBarlineValue())] as const,
  },
  {}
);
