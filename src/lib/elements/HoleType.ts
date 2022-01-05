import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<hole-type>` element
 *
 * Parent element: `<hole>`
 *
 * The content of the `<hole-type>` element indicates what the hole symbol represents in terms of instrument fingering
 * or other techniques.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/hole-type/}
 */
export type HoleType = ReturnType<typeof HoleType>;

export const HoleType = xml.element(
  'hole-type',
  { attributes: {}, content: [t.required(dataTypes.string())] as const },
  {}
);
