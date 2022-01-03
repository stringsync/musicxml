import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<voice>` element
 *
 * Parent elements: `<direction>`, `<forward>`, `<note>`
 *
 * A voice is a sequence of musical events (e.g. notes, chords, rests) that proceeds linearly in time. The `<voice>`
 * element is used to distinguish between multiple voices in individual parts.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/voice/}
 */
export type Voice = ReturnType<typeof Voice>;

export const Voice = xml.element('voice', { attributes: {}, content: [t.required(dataTypes.string())] as const }, {});
