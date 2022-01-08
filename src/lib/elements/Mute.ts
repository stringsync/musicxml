import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<mute>` element
 *
 * Parent element: `<play>`
 *
 * The `<mute>` element represents muting playback for different instruments, including brass, winds, and strings.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/mute/}
 */
export type Mute = ReturnType<typeof Mute>;

export const Mute = xml.element('mute', { attributes: {}, content: [t.required(dataTypes.mute())] as const }, {});
