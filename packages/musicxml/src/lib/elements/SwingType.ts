import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<swing-type>` element
 *
 * Parent element: `<swing>`
 *
 * The `<swing-type>` element specifies the note type, either eighth or 16th, to which the `<first>` to `<second>` ratio
 * is applied. The value is eighth if this element is not present.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/swing-type/}
 */
export const SwingType = schema('swing-type', {}, [t.required(dataTypes.swingTypeValue())] as const);
