import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<line-width>` element
 *
 * Parent element: `<appearance>`
 *
 * The `<line-width>` element indicates the width of a specific line type in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/line-width/}
 */
export const LineWidth = schema(
  'line-width',
  {
    /**
     * The type of line whose width is being defined.
     */
    type: t.required(dataTypes.lineWidthType()),
  },
  [t.label({ label: 'line-width', value: t.required(dataTypes.tenths()) })] as const
);
