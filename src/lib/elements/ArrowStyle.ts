import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<arrow-style>` element
 *
 * Parent element: `<arrow>`
 *
 * The `<arrow-style>` element represents the style of an arrow, using Unicode arrow terminology.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/arrow-style/}
 */
export type ArrowStyle = ReturnType<typeof ArrowStyle>;

export const ArrowStyle = xml.element(
  'arrow-style',
  { attributes: {}, content: [t.required(dataTypes.arrowStyle())] as const },
  {}
);
