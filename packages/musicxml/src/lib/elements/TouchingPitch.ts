import { schema } from '../schema';

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
export const TouchingPitch = schema('touching-pitch', {}, [] as const);
