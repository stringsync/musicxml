import { xml } from '../xml';

export type MovementTitle = ReturnType<typeof MovementTitle>;

/**
 * Parent elements: `<score-partwise>`, `<score-timewise>`
 *
 * The `<movement-title>` element specifies the title of a movement, not including its number.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/movement-title/}
 */
export const MovementTitle = xml.element(
  'movement-title',
  {
    attributes: {},
    content: [],
  },
  {}
);
