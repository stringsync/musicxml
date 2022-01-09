import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<fifths>` element
 *
 * Parent element: `<key>`
 *
 * The `<fifths>` element represents the number of flats or sharps in a traditional key signature. Negative numbers are
 * used for flats and positive numbers for sharps, reflecting the key's placement within the circle of fifths (hence the
 * element name).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/fifths/}
 */
export type Fifths = ReturnType<typeof Fifths>;

export const Fifths = xml.element('fifths', { attributes: {}, content: [t.optional(dataTypes.fifths())] as const }, {});
