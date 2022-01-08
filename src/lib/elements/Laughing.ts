import { xml } from '../xml';

/**
 * The `<laughing>` element
 *
 * Parent element: `<lyric>`
 *
 * The `<laughing>` element represents a laughing voice.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/laughing/}
 */
export type Laughing = ReturnType<typeof Laughing>;

export const Laughing = xml.element('laughing', { attributes: {}, content: [] as const }, {});
