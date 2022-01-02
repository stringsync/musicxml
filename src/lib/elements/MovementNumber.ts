import * as dataTypes from '../dataTypes';
import { xml } from '../xml';

/**
 * The `<movement-number>` element
 *
 * Parent elements: `<score-partwise>`, `<score-timewise>`
 *
 * The `<movement-number>` element specifies the number of a movement.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/movement-number/}
 */
export type MovementNumber = ReturnType<typeof MovementNumber>;

export const MovementNumber = xml.element(
  'movement-number',
  {
    attributes: {},
    content: [dataTypes.string()] as const,
  },
  {}
);
