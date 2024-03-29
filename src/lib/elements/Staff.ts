import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<staff>` element
 *
 * Parent elements: `<direction>`, `<forward>`, `<harmony>`, `<note>`
 *
 * Staff assignment is only needed for music notated on multiple staves. Staff values are numbers, with 1 referring to
 * the top-most staff in a part.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/staff/}
 */
export const Staff = schema('staff', {}, [
  t.label({ label: 'value', value: t.required(dataTypes.positiveInteger()) }),
] as const);
