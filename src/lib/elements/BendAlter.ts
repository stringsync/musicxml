import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<bend-alter>` element
 *
 * Parent element: `<bend>`
 *
 * The `<bend-alter>` element indicates the number of semitones in the bend, similar to the `<alter>` element. As with
 * the `<alter>` element, numbers like 0.5 can be used to indicate microtones. Negative values indicate pre-bends or
 * releases. The `<pre-bend>` and `<release>` elements are used to distinguish what is intended. Because the
 * `<bend-alter>` element represents the number of steps in the bend, a release after a bend has a negative
 * `<bend-alter>` value, not a zero value.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/bend-alter/}
 */
export const BendAlter = schema('bend-alter', {}, [t.required(dataTypes.semitones())] as const);
