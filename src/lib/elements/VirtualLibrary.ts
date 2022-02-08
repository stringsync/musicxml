import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
/**
 * The `<virtual-library>` element
 *
 * Parent element: `<virtual-instrument>`
 *
 * The `<virtual-library>` element indicates the virtual instrument library name.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/virtual-library/}
 */
export const VirtualLibrary = schema('virtual-library', {}, [t.required(dataTypes.string())] as const);
