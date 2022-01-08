import { xml } from '../xml';

/**
 * The `<end-paragraph>` element
 *
 * Parent element: `<lyric>`
 *
 * The `<end-paragraph>` element comes from RP-017 for Standard MIDI File Lyric meta-events. It facilitates lyric
 * display for Karaoke and similar applications.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/end-paragraph/}
 */
export type EndParagraph = ReturnType<typeof EndParagraph>;

export const EndParagraph = xml.element('end-paragraph', { attributes: {}, content: [] as const }, {});
