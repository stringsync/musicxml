import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<system-distance>` element
 *
 * Parent element: `<system-layout>`
 *
 * The `<system-distance>` is measured from the bottom line of the previous system to the top line of the current
 * system. It is ignored for the first system on a page.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/system-distance/}
 */
export const SystemDistance = schema('system-distance', {}, [
  t.label({ label: 'system-distance-value', value: t.required(dataTypes.tenths()) }),
] as const);
