import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<numeral-mode>` element
 *
 * Parent element: `<numeral-key>`
 *
 * The `<numeral-mode>` specifies the scale that is used to interpret the `<numeral-root>` element values.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/numeral-mode/}
 */
export type NumeralMode = ReturnType<typeof NumeralMode>;

export const NumeralMode = xml.element(
  'numeral-mode',
  { attributes: {}, content: [t.required(dataTypes.numeralMode())] as const },
  {}
);
