import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<page-width>` element
 *
 * Parent element: `<page-layout>`
 *
 * The `<page-width>` element specifies the page width in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/page-width/}
 */
export const PageWidth = schema('page-width', {}, [
  t.label({ label: 'page-width-value', value: t.required(dataTypes.tenths()) }),
] as const);
