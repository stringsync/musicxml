import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<release>` element
 *
 * Parent element: `<bend>`
 *
 * The `<release>` element indicates that a bend is a release rather than a normal bend or pre-bend. The first-beat and
 * last-beat attributes of the parent `<bend>` element are relative to the original note position, not this offset
 * value.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/release/}
 */
export const Release = schema(
  'release',
  {
    /**
     * Specifies where the release starts in terms of divisions relative to the current note.
     */
    offset: t.optional(dataTypes.divisions()),
  },
  [] as const
);
