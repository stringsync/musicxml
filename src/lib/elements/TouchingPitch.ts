import { xml } from '../xml';

/**
 * The `<touching-pitch>` element
 *
 * Parent element: `<harmonic>`
 *
 * The presence of the `<touching-pitch>` element indicates this is the pitch at which the string is touched lightly to
 * produce the harmonic.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/touching-pitch/}
 */
export type TouchingPitch = ReturnType<typeof TouchingPitch>;

export const TouchingPitch = xml.element('touching-pitch', { attributes: {}, content: [] as const }, {});
