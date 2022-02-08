import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<other-appearance>` element
 *
 * Parent element: `<appearance>`
 *
 * The `<other-appearance>` element is used to define any graphical settings not yet in the current version of the
 * MusicXML format. This allows extended representation, though without application interoperability.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/other-appearance/}
 */
export const OtherAppearance = schema(
  'other-appearance',
  {
    /**
     * The appearance type being specified.
     */
    type: t.required(dataTypes.string()),
  },
  [t.required(dataTypes.token())] as const
);
