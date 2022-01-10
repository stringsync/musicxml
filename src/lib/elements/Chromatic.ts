import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<chromatic>` element
 *
 * Parent elements: `<part-transpose>`, `<transpose>`
 *
 * The `<chromatic>` element represents the number of semitones needed to get from written to sounding pitch. This value
 * does not include `<octave-change>` values; the values for both elements need to be added to the written pitch to get
 * the correct sounding pitch.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/chromatic/}
 */
export type Chromatic = ReturnType<typeof Chromatic>;

export const Chromatic = xml.element(
  'chromatic',
  { attributes: {}, content: [t.required(dataTypes.semitones())] as const },
  {}
);
