import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<numeral-fifths>` element
 *
 * Parent element: `<numeral-key>`
 *
 * The `<numeral-fifths>` element specifies the key in the same way as the `<fifths>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/numeral-fifths/}
 */
export const NumeralFifths = schema('numeral-fifths', {}, [
  t.label({ label: 'numeral-fifths-value', value: t.required(dataTypes.fifths()) }),
] as const);
