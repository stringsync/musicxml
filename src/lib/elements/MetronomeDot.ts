import { xml } from '../xml';

/**
 * The `<metronome-dot>` element
 *
 * Parent element: `<metronome-note>`
 *
 * The metronome-dot element works like the dot element in defining metric relationships.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/metronome-dot/}
 */
export type MetronomeDot = ReturnType<typeof MetronomeDot>;

export const MetronomeDot = xml.element('metronome-dot', { attributes: {}, content: [] as const }, {});
