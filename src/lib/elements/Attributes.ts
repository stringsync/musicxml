import { xml } from '../xml';

/**
 * The `<attributes>` element
 *
 * Parent elements: `<measure>` (partwise), `<part>` (timewise)
 *
 * The `<attributes>` element contains musical information that typically changes on measure boundaries. This includes
 * key and time signatures, clefs, transpositions, and staving. When attributes are changed mid-measure, it affects the music in score order, not in MusicXML document order.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/attributes/}
 */
export type Attributes = ReturnType<typeof Attributes>;

export const Attributes = xml.element('attributes', { attributes: {}, content: [] as const }, {});
