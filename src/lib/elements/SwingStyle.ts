import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<swing-style>` element
 *
 * Parent element: `<swing>`
 *
 * The `<swing-style>` element is a string describing the style of swing used.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/swing-style/}
 */
export const SwingStyle = schema('swing-style', {}, [t.required(dataTypes.string())] as const);
