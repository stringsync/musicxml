import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<semi-pitched>` element
 *
 * Parent element: `<play>`
 *
 * The `<semi-pitched>` element represents categories of indefinite pitch for percussion instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/semi-pitched/}
 */
export type SemiPitched = ReturnType<typeof SemiPitched>;

export const SemiPitched = xml.element(
  'semi-pitched',
  { attributes: {}, content: [t.required(dataTypes.semiPitched())] as const },
  {}
);
