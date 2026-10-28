import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<instrument-name>` element
 *
 * Parent element: `<score-instrument>`
 *
 * The `<instrument-name>` element is typically used within a software application, rather than appearing on the printed
 * page of a score.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/instrument-name/}
 */
export const InstrumentName = schema('instrument-name', {}, [t.required(dataTypes.string())] as const);
