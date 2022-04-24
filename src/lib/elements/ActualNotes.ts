import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<actual-notes>` element
 *
 * Parent element: `<time-modification>`
 *
 * The `<actual-notes>` element describes how many notes are played in the time usually occupied by the number in the
 * `<normal-notes>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/actual-notes/}
 */
export const ActualNotes = schema('actual-notes', {}, [
  t.label({ label: 'value', value: t.required(dataTypes.nonNegativeInteger()) }),
] as const);
