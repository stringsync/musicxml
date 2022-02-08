import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<sign>` element
 *
 * Parent elements: `<clef>`, `<part-clef>`
 *
 * The `<sign>` element represents the clef symbol.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/sign/}
 */
export const Sign = schema('sign', {}, [t.required(dataTypes.clefSign())] as const);
