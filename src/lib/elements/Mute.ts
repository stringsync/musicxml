import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<mute>` element
 *
 * Parent element: `<play>`
 *
 * The `<mute>` element represents muting playback for different instruments, including brass, winds, and strings.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/mute/}
 */
export const Mute = schema('mute', {}, [t.required(dataTypes.mute())] as const);
