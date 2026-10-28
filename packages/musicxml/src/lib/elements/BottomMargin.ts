import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<bottom-margin>` element
 *
 * Parent element: `<page-margins>`
 *
 * The `<bottom-margin>` element specifies the bottom page margin in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/bottom-margin/}
 */
export const BottomMargin = schema('bottom-margin', {}, [
  t.label({ label: 'bottom-margin', value: t.required(dataTypes.tenths()) }),
] as const);
