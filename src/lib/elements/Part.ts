import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { Measure } from './Measure';

/**
 * The `<part>` element
 *
 * Parent element: `<score-partwise>`
 *
 * The `<part>` element is the top level of musical organization below the `<score-partwise>` document element. It
 * contains a sequence of `<measure>` elements.
 *
 *  {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/part-partwise/}
 */
export const Part = schema(
  'part',
  {
    id: dataTypes.idref(),
  },
  [t.label({ label: 'measures', value: t.oneOrMore(Measure) })] as const
);
