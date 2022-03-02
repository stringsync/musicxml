import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<second>` element
 *
 * Parent element: `<swing>`
 *
 * The `<second>` element is the part of the swing ratio that refers to the second of two consecutive notes.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/second/}
 */
export const Second = schema('second', {}, [
  t.label({ label: 'second-value', value: t.required(dataTypes.positiveInteger()) }),
] as const);
