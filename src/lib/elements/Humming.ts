import { xml } from '../xml';

/**
 * The `<humming>` element
 *
 * Parent element: `<lyric>`
 *
 * The `<humming>` element represents a humming voice.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/humming/}
 */
export type Humming = ReturnType<typeof Humming>;

export const Humming = xml.element('humming', { attributes: {}, content: [] as const }, {});
