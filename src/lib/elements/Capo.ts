import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<capo>` element
 *
 * Parent element: `<staff-details>`
 *
 * The `<capo>` element indicates at which fret a capo should be placed on a fretted instrument. This changes the open
 * tuning of the strings specified by the `<staff-tuning>` element by the specified number of half-steps.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/capo/}
 */
export const Capo = schema('capo', {}, [
  t.label({ label: 'value', value: t.required(dataTypes.nonNegativeInteger()) }),
] as const);
