import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<normal-type>` element
 *
 * Parent element: `<time-modification>`
 *
 * If the type associated with the number in the `<normal-notes>` element is different than the current note type
 * (e.g., a quarter note within an eighth note triplet), then the `<normal-notes>` type (e.g. eighth) is specified in
 * the `<normal-type>` and `<normal-dot>` elements.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/normal-type/}
 */
export type NormalType = ReturnType<typeof NormalType>;

export const NormalType = xml.element(
  'normal-type',
  { attributes: {}, content: [t.required(dataTypes.noteTypeValue())] as const },
  {}
);
