import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<key-alter>` element
 *
 * Parent element: `<key>`
 *
 * Non-traditional key signatures are represented using a list of altered tones. The `<key-alter>` element represents
 * the alteration for a given pitch step, represented with semitones in the same manner as the `<alter>` element. The
 * different element names indicate the different meaning of altering notes in a scale versus altering a sounding pitch.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/key-alter/}
 */
export type KeyAlter = ReturnType<typeof KeyAlter>;

export const KeyAlter = xml.element(
  'key-alter',
  { attributes: {}, content: [t.required(dataTypes.semitones())] as const },
  {}
);
