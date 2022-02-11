import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { Attributes } from './Attributes';
import { Backup } from './Backup';
import { Barline } from './Barline';
import { Bookmark } from './Bookmark';
import { Direction } from './Direction';
import { FiguredBass } from './FiguredBass';
import { Forward } from './Forward';
import { Grouping } from './Grouping';
import { Harmony } from './Harmony';
import { Link } from './Link';
import { Listening } from './Listening';
import { Note } from './Note';
import { Print } from './Print';
import { Sound } from './Sound';

/**
 * The `<measure>` element (partwise)
 *
 * Parent element: `<part>` (partwise)
 *
 * The `<measure>` element includes the basic musical data such as `<note>`s within a `<score-partwise>` document.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/measure-partwise/}
 */
export const Measure = schema(
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
  [
    t.label({
      label: 'contents',
      value: t.zeroOrMore(
        t.choices(
          Note,
          Backup,
          Forward,
          Direction,
          Attributes,
          Harmony,
          FiguredBass,
          Print,
          Sound,
          Listening,
          Barline,
          Grouping,
          Link,
          Bookmark
        )
      ),
    }),
  ] as const
);
