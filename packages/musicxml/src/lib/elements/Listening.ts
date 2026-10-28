import { schema, t } from '../schema';
import { Offset } from './Offset';
import { OtherListening } from './OtherListening';
import { Sync } from './Sync';

/**
 * The `<listening>` element
 *
 * Parent elements: `<direction>`, `<measure>` (partwise), `<part>` (timewise)
 *
 * The `<listen>` and `<listening>` elements, new in Version 4.0, specify different ways that a score following or
 * machine listening application can interact with a performer. The `<listening>` element handles interactions that
 * change the state of the listening application from the specified point in the performance onward. If multiple child
 * elements of the same type are present, they should have distinct player and/or time-only attributes.
 *
 * The `<offset>` element is used to indicate that the listening change takes place offset from the current score
 * position. If the `<listening>` element is a child of a `<direction>` element, the listening `<offset>` element
 * overrides the direction `<offset>` element if both elements are present.
 *
 * Note that the `<offset>` reflects the intended musical position for the change in state. It should not be used to
 * compensate for latency issues in particular hardware configurations.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/listening/}
 */
export const Listening = schema('listening', {}, [
  t.label({ label: 'listening', value: t.oneOrMore(t.choices(Sync, OtherListening)) }),
  t.optional(Offset),
] as const);
