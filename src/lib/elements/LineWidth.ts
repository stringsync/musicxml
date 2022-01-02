import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<line-width>` element
 *
 * Parent element: `<appearance>`
 *
 * The `<line-width>` element indicates the width of a specific line type in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/line-width/}
 */
export type LineWidth = ReturnType<typeof LineWidth>;

export const LineWidth = xml.element(
  'line-width',
  {
    attributes: {
      /**
       * The type of line whose width is being defined.
       */
      type: t.required(dataTypes.lineWidthType()),
    },
    content: [t.required(dataTypes.tenths())] as const,
  },
  {}
);
