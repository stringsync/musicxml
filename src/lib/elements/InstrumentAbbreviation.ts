import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<instrument-abbreviation>` element
 *
 * Parent element: `<score-instrument>`
 *
 * The `<instrument-abbreviation>` element is typically used within a software application, rather than appearing on the
 * printed page of a score.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/instrument-abbreviation/}
 */
export type InstrumentAbbreviation = ReturnType<typeof InstrumentAbbreviation>;

export const InstrumentAbbreviation = xml.element(
  'instrument-abbreviation',
  { attributes: {}, content: [t.required(dataTypes.string())] as const },
  {}
);
