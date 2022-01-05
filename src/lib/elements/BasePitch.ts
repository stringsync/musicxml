import { xml } from '../xml';

/**
 * The `<base-pitch>` element
 *
 * Parent element: `<harmonic>`
 *
 * The presence of the `<base-pitch>` element indicates this is the pitch at which the string is played before touching
 * to create the harmonic.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/base-pitch/}
 */
export type BasePitch = ReturnType<typeof BasePitch>;

export const BasePitch = xml.element('base-pitch', { attributes: {}, content: [] as const }, {});
