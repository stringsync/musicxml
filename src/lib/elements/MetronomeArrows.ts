import { xml } from '../xml';

/**
 * The `<metronome-arrows>` element
 *
 * Parent element: `<metronome>`
 *
 * If the `<metronome-arrows>` element is present, it indicates that metric modulation arrows are displayed on both
 * sides of the metronome mark.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/metronome-arrows/}
 */
export type MetronomeArrows = ReturnType<typeof MetronomeArrows>;

export const MetronomeArrows = xml.element('metronome-arrows', { attributes: {}, content: [] as const }, {});
