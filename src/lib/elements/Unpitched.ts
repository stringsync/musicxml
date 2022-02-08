import { schema, t } from '../schema';
import { DisplayOctave } from './DisplayOctave';
import { DisplayStep } from './DisplayStep';

/**
 * The `<unpitched>` element
 *
 * Parent element: `<note>`
 *
 * The `<unpitched>` element represents notes that are notated on the staff but lack definite pitch, such as unpitched
 * percussion and speaking voice. If the child elements are not present, the note is placed on the middle line of the
 * staff. This is generally used with a one-line staff. Notes in percussion clef should always use an `<unpitched>`
 * element rather than a `<pitch>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/unpitched/}
 */
export const Unpitched = schema('unpitched', {}, [t.required(DisplayStep), t.required(DisplayOctave)] as const);
