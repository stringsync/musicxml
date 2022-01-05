import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<hole-shape>` element
 *
 * Parent element: `<hole>`
 *
 * The `<hole-shape>` element indicates the shape of the hole symbol. It is a circle if not specified.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/hole-shape/}
 */
export type HoleShape = ReturnType<typeof HoleShape>;

export const HoleShape = xml.element(
  'hole-shape',
  { attributes: {}, content: [t.required(dataTypes.string())] as const },
  {}
);
