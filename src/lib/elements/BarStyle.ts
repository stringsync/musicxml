import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<bar-style>` element
 *
 * Parent element: `<barline>`
 *
 * The `<bar-style>` element contains barline style and color information.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/bar-style/}
 */
export type BarStyle = ReturnType<typeof BarStyle>;

export const BarStyle = xml.element(
  'bar-style',
  {
    attributes: {
      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),
    },
    content: [t.required(dataTypes.barStyle())] as const,
  },
  {}
);
