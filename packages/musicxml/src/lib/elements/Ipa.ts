import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
/**
 * The `<ipa>` element
 *
 * Parent element: `<play>`
 *
 * The `<ipa>` element represents International Phonetic Alphabet (IPA) sounds for vocal music. String content is
 * limited to IPA 2015 symbols represented in Unicode 13.0.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/ipa/}
 */
export const Ipa = schema('ipa', {}, [t.required(dataTypes.string())] as const);
