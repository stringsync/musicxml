import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<octave>` element
 *
 * Parent element: `<pitch>`
 *
 * Octaves are represented by the numbers 0 to 9, where 4 indicates the octave started by middle C.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/octave/}
 */
export type Octave = ReturnType<typeof Octave>;

export const Octave = xml.element('octave', { attributes: {}, content: [t.required(dataTypes.octave())] as const }, {});
