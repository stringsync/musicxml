import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<top-margin>` element
 *
 * Parent element: `<page-margins>`
 *
 * The `<top-margin>` element specifies the top page margin in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/top-margin/}
 */
export type TopMargin = ReturnType<typeof TopMargin>;

export const TopMargin = xml.element(
  'top-margin',
  { attributes: {}, content: [t.required(dataTypes.tenths())] as const },
  {}
);
