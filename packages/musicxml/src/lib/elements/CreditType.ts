import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<credit-type>` element
 *
 * Parent element: `<credit>`
 *
 * The `<credit-type>` element indicates the purpose behind a credit. Multiple types of data may be combined in a single
 * credit, so multiple elements may be used. Standard values include:
 *
 * - page number
 * - title
 * - subtitle
 * - composer
 * - arranger
 * - lyricist
 * - rights
 * - part name
 *
 * Other values may also be used.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/credit-type/}
 */
export const CreditType = schema('credit-type', {}, [t.required(dataTypes.string())] as const);
