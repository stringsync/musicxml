import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<mode>` element
 *
 * Parent element: `<key>`
 *
 * The `<mode>` element is used to specify major/minor and other mode distinctions. Valid mode values include major,
 * minor, dorian, phrygian, lydian, mixolydian, aeolian, ionian, locrian, and none.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/mode/}
 */
export type Mode = ReturnType<typeof Mode>;

export const Mode = xml.element('mode', { attributes: {}, content: [t.required(dataTypes.mode())] as const }, {});
