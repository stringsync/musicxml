import { t } from '../xml';

/**
 * The accidental-value type represents notated accidentals supported by MusicXML. In the MusicXML 2.0 DTD this was a
 * string with values that could be included. The XSD strengthens the data typing to an enumerated list. The quarter-
 * and three-quarters- accidentals are Tartini-style quarter-tone accidentals. The -down and -up accidentals are
 * quarter-tone accidentals that include arrows pointing down or up. The slash- accidentals are used in Turkish
 * classical music. The numbered sharp and flat accidentals are superscripted versions of the accidental signs, used in
 * Turkish folk music. The sori and koron accidentals are microtonal sharp and flat accidentals used in Iranian and
 * Persian music. The other accidental covers accidentals other than those listed here. It is usually used in
 * combination with the smufl attribute to specify a particular Standard Music Font Layout (SMuFL) accidental. The smufl
 * attribute may be used with any accidental value to help specify the appearance of symbols that share the same
 * MusicXML semantics.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/accidental-value/}
 */
export const accidentalValue = () => {
  return t.choices(
    ...([
      'other',
      'sharp',
      'natural',
      'flat',
      'double-sharp',
      'sharp-sharp',
      'flat-flat',
      'natural-sharp',
      'natural-flat',
      'quarter-flat',
      'quarter-sharp',
      'three-quarters-flat',
      'three-quarters-sharp',
      'sharp-down',
      'sharp-up',
      'natural-down',
      'natural-up',
      'flat-down',
      'flat-up',
      'double-sharp-down',
      'double-sharp-up',
      'flat-flat-down',
      'flat-flat-up',
      'arrow-down',
      'arrow-up',
      'triple-sharp',
      'triple-flat',
      'slash-quarter-sharp',
      'slash-sharp',
      'slash-flat',
      'double-slash-flat',
      'sharp-1',
      'sharp-2',
      'sharp-3',
      'sharp-5',
      'flat-1',
      'flat-2',
      'flat-3',
      'flat-4',
      'sori',
      'koron',
    ] as const)
  );
};
