import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<beat-type>` element
 *
 * Parent elements: `<interchangeable>`, `<time>`
 *
 * The `<beat-type>` element indicates the beat unit, as found in the denominator of a time signature.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/beat-type/}
 */
export type BeatType = ReturnType<typeof BeatType>;

export const BeatType = xml.element(
  'beat-type',
  { attributes: {}, content: [t.required(dataTypes.string())] as const },
  {}
);
