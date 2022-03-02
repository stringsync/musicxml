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
 * The `<part>` element (timewise)
 *
 * Parent element: `<measure>` (timewise)
 *
 * The `<part>` element includes the basic musical data such as `<note>`s within a `<score-timewise>` document.
 *
 *  {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/part-partwise/}
 */
export const PartTimewise = schema(
  'part',
  {
    /**
     * An IDREF back to a `<score-part>` element within the `<part-list>` element.
     */
    id: dataTypes.idref(),
  },
  [
    t.label({
      label: 'part-timewise-values',
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
  ] as const,
  { className: 'part-timewise' }
);
