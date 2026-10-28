import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<millimeters>` element
 *
 * Parent element: `<scaling>`
 *
 * The `<millimeters>` element contains the number of millimeters that correspond to the given number of tenths within
 * the `<scaling>` element formula.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/millimeters/}
 */
export const Millimeters = schema('millimeters', {}, [t.required(dataTypes.millimeters())] as const);
