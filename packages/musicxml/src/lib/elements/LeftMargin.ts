import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<left-margin>` element
 *
 * Parent elements: `<page-margins>`, `<system-margins>`
 *
 * The `<left-margin>` element specifies the left margin for the parent element in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/left-margin/}
 */
export const LeftMargin = schema('left-margin', {}, [
  t.label({ label: 'left-margin', value: t.required(dataTypes.tenths()) }),
] as const);
