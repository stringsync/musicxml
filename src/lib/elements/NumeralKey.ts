import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
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
export type NumeralKey = ReturnType<typeof NumeralKey>;

export const NumeralKey = xml.element(
  'numeral-key',
  {
    attributes: {
      /**
       * Specifies whether or not to print an object. It is yes if not specified.
       */
      ['print-object']: t.optional(dataTypes.yesNo()),
    },
    content: [t.required(NumeralFifths), t.required(NumeralMode)] as const,
  },
  {}
);
