import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

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
export type NormalNotes = ReturnType<typeof NormalNotes>;

export const NormalNotes = xml.element(
  'normal-notes',
  { attributes: {}, content: [t.required(dataTypes.nonNegativeInteger())] as const },
  {}
);
