import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<semi-pitched>` element
 *
 * Parent element: `<play>`
 *
 * The `<semi-pitched>` element represents categories of indefinite pitch for percussion instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/semi-pitched/}
 */
export const SemiPitched = schema('semi-pitched', {}, [t.required(dataTypes.semiPitched())] as const);
