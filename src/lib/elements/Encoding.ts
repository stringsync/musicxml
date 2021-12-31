import { t, xml } from '../xml';
import { EncodingDate } from './EncodingDate';

/**
 * Parent element: `<identification>`
 *
 * The `<encoding>` element contains information about who did the digital encoding, when, with what software, and in
 * what aspects.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/encoding/}
 */
export type Encoding = ReturnType<typeof Encoding>;

export const Encoding = xml.element('encoding', { attributes: {}, content: [t.optional(EncodingDate)] }, {});
