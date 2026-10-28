import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { MeasurePartwise } from './MeasurePartwise';

/**
 * The `<part>` element
 *
 * Parent element: `<score-partwise version="4.0">`
 *
 * The `<part>` element is the top level of musical organization below the `<score-partwise version="4.0">` document element. It
 * contains a sequence of `<measure>` elements.
 *
 *  {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/part-partwise/}
 */
export const PartPartwise = schema(
  'part',
  {
    /**
     * An IDREF back to a `<score-part>` element within the `<part-list>` element.
     */
    id: dataTypes.idref(),
  },
  [t.label({ label: 'measures', value: t.oneOrMore(MeasurePartwise) })] as const,
  { className: 'part-partwise' }
);
