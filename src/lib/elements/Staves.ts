import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<staves>` element
 *
 * Parent element: `<attributes>`
 *
 * The `<staves>` element is used if there is more than one staff represented in the given part (e.g., 2 staves for
 * typical piano parts). If absent, a value of 1 is assumed. Staves are ordered from top to bottom in a part in
 * numerical order, with staff 1 above staff 2.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/staves/}
 */
export type Staves = ReturnType<typeof Staves>;

export const Staves = xml.element(
  'staves',
  { attributes: {}, content: [t.required(dataTypes.nonNegativeInteger())] as const },
  {}
);
