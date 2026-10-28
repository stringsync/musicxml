import { t } from '../schema';
/**
 * The glyph-type defines what type of glyph is being defined in a `<glyph>` element. Values include:
 *
 * - quarter-rest
 * - g-clef-ottava-bassa
 * - c-clef
 * - f-clef
 * - percussion-clef
 * - octave-shift-up-8
 * - octave-shift-down-8
 * - octave-shift-continue-8
 * - octave-shift-down-15
 * - octave-shift-up-15
 * - octave-shift-continue-15
 * - octave-shift-down-22
 * - octave-shift-up-22
 * - octave-shift-continue-22
 *
 * This is left as a string so that other application-specific types can be defined, but it is made a separate type so
 * that it can be redefined more strictly.
 *
 * A quarter-rest type specifies the glyph to use when a note has a `<rest>` element and a `<type>` value of quarter.
 *
 * The c-clef, f-clef, and percussion-clef types specify the glyph to use when a clef `<sign>` element value is C, F, or
 * percussion respectively.
 *
 * The g-clef-ottava-bassa type specifies the glyph to use when a clef `<sign>` element value is G and the
 * `<clef-octave-change>` element value is -1.
 *
 * The octave-shift types specify the glyph to use when an `<octave-shift>` type attribute value is up, down, or
 * continue and the `<octave-shift>` size attribute value is 8, 15, or 22.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/glyph-type/}
 */
export const glyphType = () => {
  return t.choices(
    ...([
      'quarter-rest',
      'g-clef-ottava-bassa',
      'c-clef',
      'f-clef',
      'percussion-clef',
      'octave-shift-up-8',
      'octave-shift-down-8',
      'octave-shift-down-15',
      'octave-shift-continue-15',
      'octave-shift-down-22',
      'octave-shift-up-22',
      'octave-shift-continue-22',
    ] as const)
  );
};
