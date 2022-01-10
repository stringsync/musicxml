import { xml } from '../xml';

/**
 * The `<slash-dot>` element
 *
 * Parent elements: `<beat-repeat>`, `<slash>`
 *
 * The `<slash-dot>` element is used to specify any augmentation dots in the note type used to display repetition marks.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/slash-dot/}
 */
export type SlashDot = ReturnType<typeof SlashDot>;

export const SlashDot = xml.element('slash-dot', { attributes: {}, content: [] as const }, {});
