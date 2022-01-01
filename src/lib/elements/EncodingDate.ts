import * as dataTypes from '../dataTypes';
import { xml } from '../xml';

/**
 * The `<encoding-date>` element
 *
 * Parent element: `<encoding>`
 *
 * The `<encoding-date>` element specifies the date of the digital encoding.
 */
export type EncodingDate = ReturnType<typeof EncodingDate>;

export const EncodingDate = xml.element(
  'encoding-date',
  {
    attributes: {},
    content: [dataTypes.yyyyMmDdd()] as const,
  },
  {}
);
