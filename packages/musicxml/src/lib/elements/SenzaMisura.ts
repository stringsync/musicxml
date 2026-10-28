import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<senza-misura>` element
 *
 * Parent element: `<time>`
 *
 * A `<senza-misura>` element explicitly indicates that no time signature is present. The optional element content
 * indicates the symbol to be used, if any, such as an X. The `<time>` element's symbol attribute is not used when a
 * `<senza-misura>` element is present.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/senza-misura/}
 */
export const SenzaMisura = schema('senza-misura', {}, [t.required(dataTypes.string())] as const);
