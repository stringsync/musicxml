import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { NumeralFifths } from './NumeralFifths';
import { NumeralMode } from './NumeralMode';

/**
 * The `<numeral-key>` element
 *
 * Parent element: `<numeral>`
 *
 * The `<numeral-key>` element is used when the key for the numeral is different than the key specified by the key
 * signature.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/numeral-key/}
 */
export const NumeralKey = schema(
  'numeral-key',
  {
    /**
     * Specifies whether or not to print an object. It is yes if not specified.
     */
    ['print-object']: t.optional(dataTypes.yesNo()),
  },
  [t.required(NumeralFifths), t.required(NumeralMode)] as const
);
