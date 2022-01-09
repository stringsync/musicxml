import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<stick-material>` element
 *
 * Parent element: `<stick>`
 *
 * The `<stick-material>` element represents the material being displayed in a stick pictogram.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/stick-material/}
 */
export type StickMaterial = ReturnType<typeof StickMaterial>;

export const StickMaterial = xml.element(
  'stick-material',
  { attributes: {}, content: [t.required(dataTypes.stickMaterial())] as const },
  {}
);
