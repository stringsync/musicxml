import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

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
export type Ipa = ReturnType<typeof Ipa>;

export const Ipa = xml.element('ipa', { attributes: {}, content: [t.required(dataTypes.string())] as const }, {});
