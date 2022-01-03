import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

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
export type ActualNotes = ReturnType<typeof ActualNotes>;

export const ActualNotes = xml.element(
  'actual-notes',
  { attributes: {}, content: [t.required(dataTypes.nonNegativeInteger())] as const },
  {}
);
