import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<sign>` element
 *
 * Parent elements: `<clef>`, `<part-clef>`
 *
 * The `<sign>` element represents the clef symbol.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/sign/}
 */
export type Sign = ReturnType<typeof Sign>;

export const Sign = xml.element('sign', { attributes: {}, content: [t.required(dataTypes.clefSign())] as const }, {});
