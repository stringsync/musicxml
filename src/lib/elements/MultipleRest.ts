import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<multiple-rest>` element
 *
 * Parent element: `<measure-style>`
 *
 * The `<multiple-rest>` element indicates multiple rests that span several measures. The element text indicates the number of measures in the multiple rest.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/multiple-rest/}
 */
export type MultipleRest = ReturnType<typeof MultipleRest>;

export const MultipleRest = xml.element(
  'multiple-rest',
  {
    attributes: {
      /**
       * Specifies whether the multiple rests uses the 1-bar / 2-bar / 4-bar rest symbols, or a single shape. It is no if
       * not specified.
       */
      ['use-symbols']: t.optional(dataTypes.yesNo()),
    },
    content: [t.required(dataTypes.positiveInteger())] as const,
  },
  {}
);
