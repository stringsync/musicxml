import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
/**
 * The `<virtual-name>` element
 *
 * Parent element: `<virtual-instrument>`
 *
 * The `<virtual-name>` element indicates the library-specific name for the virtual instrument.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/virtual-name/}
 */
export const VirtualName = schema('virtual-name', {}, [t.required(dataTypes.string())] as const);
