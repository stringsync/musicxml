import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

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
export const InstrumentAbbreviation = schema('instrument-abbreviation', {}, [t.required(dataTypes.string())] as const);
