import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<cancel>` element
 *
 * Parent element: `<key>`
 *
 * The `<cancel>` element indicates that the old key signature should be cancelled before the new one appears. This will
 * always happen when changing to C major or A minor and need not be specified then. The `<cancel>` element value
 * matches the fifths value of the cancelled key signature (e.g., a cancel of -2 will provide an explicit cancellation
 * for changing from B flat major to F major).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/cancel/}
 */
export const Cancel = schema(
  'cancel',
  {
    /**
     * Indicates where the cancellation appears relative to the new key signature. It is left if not specified.
     */
    location: t.optional(dataTypes.cancelLocation()),
  },
  [t.label({ label: 'fifths', value: t.required(dataTypes.fifths()) })] as const
);
