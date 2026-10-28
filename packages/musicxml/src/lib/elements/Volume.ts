import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<volume>` element
 *
 * Parent element: `<midi-instrument>`
 *
 * The `<volume>` element value is a percentage of the maximum ranging from 0 to 100, with decimal values allowed. This
 * corresponds to a scaling value for the MIDI 1.0 channel volume controller.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/volume/}
 */
export const Volume = schema('volume', {}, [
  t.label({ label: 'volume', value: t.required(dataTypes.percent()) }),
] as const);
