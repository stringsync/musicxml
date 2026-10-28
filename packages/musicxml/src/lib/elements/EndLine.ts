import { schema } from '../schema';

/**
 * The `<end-line>` element
 *
 * Parent element: `<lyric>`
 *
 * The `<end-line>` element comes from RP-017 for Standard MIDI File Lyric meta-events. It facilitates lyric display for
 * Karaoke and similar applications.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/end-line/}
 */
export const EndLine = schema('end-line', {}, [] as const);
