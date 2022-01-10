import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<numeral-fifths>` element
 *
 * Parent element: `<numeral-key>`
 *
 * The `<numeral-fifths>` element specifies the key in the same way as the `<fifths>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/numeral-fifths/}
 */
export type NumeralFifths = ReturnType<typeof NumeralFifths>;

export const NumeralFifths = xml.element(
  'numeral-fifths',
  { attributes: {}, content: [t.required(dataTypes.fifths())] as const },
  {}
);
