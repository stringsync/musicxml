import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<harmon-closed>` element
 *
 * Parent element: `<harmon-mute>`
 *
 * The `<harmon-closed>` element represents whether the harmon mute is closed, open, or half-open.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/harmon-closed/}
 */
export const HarmonClosed = schema(
  'harmon-closed',
  {
    /**
     * Indicates which portion of the symbol is filled in when the element value is half.
     */
    location: t.optional(dataTypes.harmonClosedLocation()),
  },
  [t.required(dataTypes.harmonClosedValue())] as const
);
