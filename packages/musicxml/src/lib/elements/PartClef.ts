import { schema, t } from '../schema';
import { ClefOctaveChange } from './ClefOctaveChange';
import { Line } from './Line';
import { Sign } from './Sign';

/**
 * The `<part-clef>` element
 *
 * Parent element: `<for-part>`
 *
 * The `<part-clef>` element is used for transpositions from concert scores that also include a change of clef, as for
 * instruments such as bass clarinet.
 *
 * The child elements of the `<part-clef>` element have the same meaning as for the `<clef>` element. However that
 * meaning applies to a transposed part created from the existing score file.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/part-clef/}
 */
export const PartClef = schema('part-clef', {}, [
  t.required(Sign),
  t.optional(Line),
  t.optional(ClefOctaveChange),
] as const);
