import { schema, t } from '../schema';
import { NumeralAlter } from './NumeralAlter';
import { NumeralKey } from './NumeralKey';
import { NumeralRoot } from './NumeralRoot';

/**
 * The `<numeral>` element
 *
 * Parent element: `<harmony>`
 *
 * The `<numeral>` element represents the Roman numeral or Nashville number part of a harmony. It requires that the key
 * be specified in the encoding, either with a `<key>` or `<numeral-key>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/numeral/}
 */
export const Numeral = schema('numeral', {}, [
  t.required(NumeralRoot),
  t.optional(NumeralAlter),
  t.optional(NumeralKey),
] as const);
