import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<top-system-distance>` element
 *
 * Parent element: `<system-layout>`
 *
 * The `<top-system-distance>` is measured from the page's top margin to the top line of the first system. It is ignored
 * for all but the first system on a page.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/top-system-distance/}
 */
export const TopSystemDistance = schema('top-system-distance', {}, [
  t.label({ label: 'top-system-distance', value: t.required(dataTypes.tenths()) }),
] as const);
