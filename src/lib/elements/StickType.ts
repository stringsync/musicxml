import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<stick-type>` element
 *
 * Parent element: `<stick>`
 *
 * The `<stick-type>` element represents the shape of pictograms where the material in the stick, mallet, or beater is
 * represented in the pictogram.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/stick-type/}
 */
export type StickType = ReturnType<typeof StickType>;

export const StickType = xml.element(
  'stick-type',
  { attributes: {}, content: [t.required(dataTypes.stickType())] as const },
  {}
);
