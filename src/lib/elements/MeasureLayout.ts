import { schema, t } from '../schema';
import { MeasureDistance } from './MeasureDistance';

/**
 * The `<measure-layout>` element
 *
 * Parent element: `<print>`
 *
 * The `<measure-layout>` element includes the horizontal distance from the previous measure. It applies to the current
 * measure only.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/measure-layout/}
 */
export const MeasureLayout = schema('measure-layout', {}, [t.optional(MeasureDistance)] as const);
