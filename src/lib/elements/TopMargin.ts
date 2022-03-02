import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<top-margin>` element
 *
 * Parent element: `<page-margins>`
 *
 * The `<top-margin>` element specifies the top page margin in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/top-margin/}
 */
export const TopMargin = schema('top-margin', {}, [
  t.label({ label: 'top-margin-value', value: t.required(dataTypes.tenths()) }),
] as const);
