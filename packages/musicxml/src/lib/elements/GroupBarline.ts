import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<group-barline>` element
 *
 * Parent element: `<part-group>`
 *
 * The `<group-barline>` element indicates if the group should have common barlines.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/group-barline/}
 */
export const GroupBarline = schema(
  'group-barline',
  {
    /**
     * Indicates the color of an element.
     */
    color: t.optional(dataTypes.color()),
  },
  [t.required(dataTypes.groupBarlineValue())] as const
);
