import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<bottom-margin>` element
 *
 * Parent element: `<page-margins>`
 *
 * The `<bottom-margin>` element specifies the bottom page margin in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/bottom-margin/}
 */
export type BottomMargin = ReturnType<typeof BottomMargin>;

export const BottomMargin = xml.element(
  'bottom-margin',
  { attributes: {}, content: [t.label({ label: 'bottom-margin', value: t.required(dataTypes.tenths()) })] as const },
  {}
);
