import { xml } from '../xml';

/**
 * The `<normal-dot>` element
 *
 * Parent element: `<time-modification>`
 *
 * The `<normal-dot>` element is used to specify dotted normal tuplet types.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/normal-dot/}
 */
export type NormalDot = ReturnType<typeof NormalDot>;

export const NormalDot = xml.element('normal-dot', { attributes: {}, content: [] as const }, {});
