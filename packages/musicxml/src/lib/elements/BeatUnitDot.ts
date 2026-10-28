import { schema } from '../schema';

/**
 * The `<beat-unit-dot>` element
 *
 * Parent elements: `<beat-unit-tied>`, `<metronome>`
 *
 * The `<beat-unit-dot>` element is used to specify any augmentation dots for a metronome mark note.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/beat-unit-dot/}
 */
export const BeatUnitDot = schema('beat-unit-dot', {}, [] as const);
