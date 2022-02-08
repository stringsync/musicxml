import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

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
export const Mode = schema('mode', {}, [t.required(dataTypes.mode())] as const);
