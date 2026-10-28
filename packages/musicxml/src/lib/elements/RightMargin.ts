import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<right-margin>` element
 *
 * Parent elements: `<page-margins>`, `<system-margins>`
 *
 * The `<right-margin>` element specifies the right margin for the parent element in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/right-margin/}
 */
export const RightMargin = schema('right-margin', {}, [
  t.label({ label: 'value', value: dataTypes.tenths() }),
] as const);
