import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<encoding-description>` element
 *
 * Parent element: `<encoding>`
 *
 * The `<encoding-description>` element contains descriptive information about the digital encoding that is not
 * provided in the other `<encoding>` child elements.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/encoding-description/}
 */
export const EncodingDescription = schema('encoding-description', {}, [t.required(dataTypes.string())] as const);
