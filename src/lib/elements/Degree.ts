import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { DegreeAlter } from './DegreeAlter';
import { DegreeType } from './DegreeType';
import { DegreeValue } from './DegreeValue';

/**
 * The `<degree>` element
 *
 * Parent element: `<harmony>`
 *
 * The `<degree>` element is used to add, alter, or subtract individual notes in the chord. The print-object attribute
 * can be used to keep the degree from printing separately when it has already taken into account in the text attribute
 * of the `<kind>` element.
 *
 * A harmony with a `<kind>` value of other can be spelled explicitly by using a series of `<degree>` elements together
 * with a `<root>`, `<numeral>`, or `<function>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/degree/}
 */
export type Degree = ReturnType<typeof Degree>;

export const Degree = xml.element(
  'degree',
  {
    attributes: {
      /**
       * Specifies whether or not to print an object. It is yes if not specified.
       */
      ['print-object']: t.optional(dataTypes.yesNo()),
    },
    content: [t.required(DegreeValue), t.required(DegreeAlter), t.required(DegreeType)] as const,
  },
  {}
);
