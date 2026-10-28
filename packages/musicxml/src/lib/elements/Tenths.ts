import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<tenths>` element
 *
 * Parent element: `<scaling>`
 *
 * The `<tenths>` element contains the number of tenths that correspond to the given number of millimeters within the
 * `<scaling>` element formula. Setting this to 40 allows the `<millimeters>` element to specify the size of a 5-line
 * staff.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/tenths/}
 */
export const Tenths = schema('tenths', {}, [
  t.label({ label: 'tenths-value', value: t.required(dataTypes.tenths()) }),
] as const);
