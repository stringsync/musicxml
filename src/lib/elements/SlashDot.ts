import { schema } from '../schema';

/**
 * The `<slash-dot>` element
 *
 * Parent elements: `<beat-repeat>`, `<slash>`
 *
 * The `<slash-dot>` element is used to specify any augmentation dots in the note type used to display repetition marks.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/slash-dot/}
 */
export const SlashDot = schema('slash-dot', {}, [] as const);
