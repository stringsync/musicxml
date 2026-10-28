import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<encoding-date>` element
 *
 * Parent element: `<encoding>`
 *
 * The `<encoding-date>` element specifies the date of the digital encoding.
 */
export const EncodingDate = schema('encoding-date', {}, [t.required(dataTypes.yyyyMmDd())] as const);
