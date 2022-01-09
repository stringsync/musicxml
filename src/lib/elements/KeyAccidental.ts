import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<key-accidental>` element
 *
 * Parent element: `<key>`
 *
 * Non-traditional key signatures are represented using a list of altered tones. The `<key-accidental>` element
 * indicates the accidental to be displayed in the key signature, represented in the same manner as the `<accidental>`
 * element. It is used for disambiguating microtonal accidentals. The different element names indicate the different
 * meaning of altering notes in a scale versus altering a sounding pitch.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/key-accidental/}
 */
export type KeyAccidental = ReturnType<typeof KeyAccidental>;

export const KeyAccidental = xml.element(
  'key-accidental',
  {
    attributes: {
      /**
       * Specifies a Standard Music Font Layout (SMuFL) accidental character by its canonical glyph name.
       */
      smufl: t.optional(dataTypes.smuflAccidentalGlyphName()),
    },
    content: [t.required(dataTypes.accidentalValue())] as const,
  },
  {}
);
