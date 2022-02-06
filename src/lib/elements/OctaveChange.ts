import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<octave-change>` element
 *
 * Parent elements: `<part-transpose>`, `<transpose>`
 *
 * The `<octave-change>` element indicates how many octaves to add to get from written pitch to sounding pitch. The
 * `<octave-change>` element should be included when using transposition intervals of an octave or more, and should not
 * be present for intervals of less than an octave.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/octave-change/}
 */
export type OctaveChange = ReturnType<typeof OctaveChange>;

export const OctaveChange = xml.element(
  'octave-change',
  { attributes: {}, content: [t.label({ label: 'octave-change', value: t.required(dataTypes.integer()) })] as const },
  {}
);
