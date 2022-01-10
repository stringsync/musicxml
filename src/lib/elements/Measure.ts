import { t, xml } from '../xml';
import { Attributes } from './Attributes';
import { Backup } from './Backup';
import { Direction } from './Direction';
import { FiguredBass } from './FiguredBass';
import { Forward } from './Forward';
import { Harmony } from './Harmony';
import { Note } from './Note';

/**
 * The `<measure>` element (partwise)
 *
 * Parent element: `<part>` (partwise)
 *
 * The `<measure>` element includes the basic musical data such as `<note>`s within a `<score-partwise>` document.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/measure-partwise/}
 */
export type Measure = ReturnType<typeof Measure>;

export const Measure = xml.element(
  'measure',
  {
    attributes: {},
    content: [t.zeroOrMore(t.choices(Note, Backup, Forward, Direction, Attributes, Harmony, FiguredBass))] as const,
  },
  {}
);
