import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<normal-notes>` element
 *
 * Parent element: `<time-modification>`
 *
 * The `<normal-notes>` element describes how many notes are usually played in the time occupied by the number in the
 * `<actual-notes>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/normal-notes/}
 */
export const NormalNotes = schema('normal-notes', {}, [
  t.label({ label: 'value', value: t.required(dataTypes.nonNegativeInteger()) }),
] as const);
