import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<diatonic>` element
 *
 * Parent elements: `<part-transpose>`, `<transpose>`
 *
 * The `<diatonic>` element specifies the number of pitch steps needed to go from written to sounding pitch. This allows
 * for correct spelling of enharmonic transpositions. This value does not include <octave-change> values; the values for
 * both elements need to be added to the written pitch to get the correct sounding pitch.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/diatonic/}
 */
export type Diatonic = ReturnType<typeof Diatonic>;

export const Diatonic = xml.element(
  'diatonic',
  { attributes: {}, content: [t.required(dataTypes.integer())] as const },
  {}
);
