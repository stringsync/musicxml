import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

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
export type CreditType = ReturnType<typeof CreditType>;

export const CreditType = xml.element(
  'credit-type',
  { attributes: {}, content: [t.required(dataTypes.string())] as const },
  {}
);
