import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<measure-distance>` element
 *
 * Parent element: `<measure-layout>`
 *
 * The `<measure-distance>` element specifies the horizontal distance from the previous measure. This value is only used
 * for systems where there is horizontal whitespace in the middle of a system, as in systems with codas. To specify the
 * measure width, use the width attribute of the `<measure>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/measure-distance/}
 */
export type MeasureDistance = ReturnType<typeof MeasureDistance>;

export const MeasureDistance = xml.element(
  'measure-distance',
  { attributes: {}, content: [t.required(dataTypes.tenths())] as const },
  {}
);
