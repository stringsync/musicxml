import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<arrow-direction>` element
 *
 * Parent element: `<arrow>`
 *
 * The `<arrow-direction>` element represents the direction in which an arrow points, using Unicode arrow terminology.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/arrow-direction/}
 */
export type ArrowDirection = ReturnType<typeof ArrowDirection>;

export const ArrowDirection = xml.element(
  'arrow-direction',
  { attributes: {}, content: [t.required(dataTypes.arrowDirection())] as const },
  {}
);
