import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<capo>` element
 *
 * Parent element: `<staff-details>`
 *
 * The `<capo>` element indicates at which fret a capo should be placed on a fretted instrument. This changes the open
 * tuning of the strings specified by the `<staff-tuning>` element by the specified number of half-steps.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/capo/}
 */
export type Capo = ReturnType<typeof Capo>;

export const Capo = xml.element(
  'capo',
  { attributes: {}, content: [t.required(dataTypes.nonNegativeInteger())] as const },
  {}
);
