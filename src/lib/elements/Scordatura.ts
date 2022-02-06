import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { Accord } from './Accord';

/**
 * The `<scordatura>` element
 *
 * Parent element: `<direction-type>`
 *
 * Scordatura string tunings are represented by a series of `<accord>` elements, similar to the `<staff-tuning>`
 * elements. Strings are numbered from high to low.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/scordatura/}
 */
export type Scordatura = ReturnType<typeof Scordatura>;

export const Scordatura = xml.element(
  'scordatura',
  {
    attributes: {
      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),
    },
    content: [t.label({ label: 'accords', value: t.oneOrMore(Accord) })] as const,
  },
  {}
);
