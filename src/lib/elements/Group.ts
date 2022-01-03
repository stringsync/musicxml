import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<group>` element
 *
 * Parent element: `<score-part>`
 *
 * The `<group>` element allows the use of different versions of the part for different purposes. Typical values include
 * score, parts, sound, and data. Ordering information can be derived from the ordering within a MusicXML score or opus.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/group/}
 */
export type Group = ReturnType<typeof Group>;

export const Group = xml.element('group', { attributes: {}, content: [t.required(dataTypes.string())] as const }, {});
