import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<circular-arrow>` element
 *
 * Parent element: `<arrow>`
 *
 * The `<circular-arrow>` element represents a circular arrow, using Unicode arrow terminology to specify the arrow
 * direction.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/circular-arrow/}
 */
export type CircularArrow = ReturnType<typeof CircularArrow>;

export const CircularArrow = xml.element(
  'circular-arrow',
  { attributes: {}, content: [t.required(dataTypes.circularArrow())] as const },
  {}
);
