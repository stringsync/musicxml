import { t, xml } from '../xml';
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
export type MeasureLayout = ReturnType<typeof MeasureLayout>;

export const MeasureLayout = xml.element(
  'measure-layout',
  { attributes: {}, content: [t.optional(MeasureDistance)] as const },
  {}
);
