import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

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
export type SenzaMisura = ReturnType<typeof SenzaMisura>;

export const SenzaMisura = xml.element(
  'senza-misura',
  { attributes: {}, content: [t.required(dataTypes.string())] as const },
  {}
);
