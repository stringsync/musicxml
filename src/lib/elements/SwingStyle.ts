import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<swing-style>` element
 *
 * Parent element: `<swing>`
 *
 * The `<swing-style>` element is a string describing the style of swing used.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/swing-style/}
 */
export type SwingStyle = ReturnType<typeof SwingStyle>;

export const SwingStyle = xml.element(
  'swing-style',
  { attributes: {}, content: [t.required(dataTypes.string())] as const },
  {}
);
