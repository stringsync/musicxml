import { xml } from '../xml';

/**
 * The `<sounding-pitch>` element
 *
 * Parent element: `<harmonic>`
 *
 * The presence of the `<sounding-pitch>` element indicates this is the pitch which is heard when playing the harmonic.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/sounding-pitch/}
 */
export type SoundingPitch = ReturnType<typeof SoundingPitch>;

export const SoundingPitch = xml.element('sounding-pitch', { attributes: {}, content: [] as const }, {});
