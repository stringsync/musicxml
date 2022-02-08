import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<clef-octave-change>` element
 *
 * Parent elements: `<clef>`, `<part-clef>`
 *
 * The `<clef-octave-change>` element is used for transposing clefs. A treble clef for tenors would have a value of -1.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/clef-octave-change/}
 */
export const ClefOctaveChange = schema('clef-octave-change', {}, [
  t.label({ label: 'clef-octave-change', value: t.required(dataTypes.integer()) }),
] as const);
