import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<page-height>` element
 *
 * Parent element: `<page-layout>`
 *
 * The `<page-height>` element specifies the page height in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/page-height/}
 */
export const PageHeight = schema('page-height', {}, [
  t.label({ label: 'page-height', value: t.required(dataTypes.tenths()) }),
] as const);
