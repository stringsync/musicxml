import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { PartTimewise } from './PartTimewise';

/**
 * The `<measure>` element (timewise)
 *
 * Parent element: `<score-timewise>`
 *
 * The `<measure>` element is the top level of musical organization below the `<score-timewise>` document element. It
 * contains a sequence of `<part>` elements.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/measure-timewise/}
 */
export const MeasureTimewise = schema(
  'measure',
  {
    /**
     * The attribute that identifies the measure. Going from partwise to timewise, measures are grouped via this
     * attribute. In partwise files, it should be the same for measures in different parts that share the same left
     * barline.
     *
     * While often numeric, it does not have to be. Non-numeric values are typically used together with the implicit or
     * non-controlling attributes being set to "yes". For a pickup measure, the number attribute is typically set to "0"
     * and the implicit attribute is typically set to "yes".
     */
    number: t.required(dataTypes.token()),

    /**
     * Specifies an ID that is unique to the entire document.
     */
    id: t.optional(dataTypes.id()),

    /**
     * Set to "yes" for measures where the measure number should never appear, such as pickup measures and the last half
     * of mid-measure repeats. The value is "no" if not specified.
     */
    implicit: t.optional(dataTypes.yesNo()),

    /**
     * Intended for use in multimetric music like the Don Giovanni minuet. If set to "yes", the left barline in this
     * measure does not coincide with the left barline of measures in other parts. The value is "no" if not specified.
     */
    ['non-controller']: t.optional(dataTypes.yesNo()),

    /**
     * If measure numbers are not unique within a part, this can cause problems for conversions between partwise and
     * timewise formats. The text attribute allows specification of displayed measure numbers that are different than
     * what is used in the number attribute. This attribute is ignored for measures where the implicit attribute is set
     * to "yes". Further details about measure numbering can be specified using the `<measure-numbering>` element.
     */
    text: t.optional(dataTypes.measureText()),

    /**
     * Measure width specified in tenths. These are the global tenths specified in the `<scaling>` element, not local
     * tenths as modified by the `<staff-size>` element. The width covers the entire measure from barline or system
     * start to barline or system end.
     */
    width: t.optional(dataTypes.tenths()),
  },
  [t.label({ label: 'parts-timewise', value: t.oneOrMore(PartTimewise) })] as const,
  { className: 'measure-timewise' }
);
