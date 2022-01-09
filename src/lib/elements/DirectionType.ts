import { t, xml } from '../xml';
import { Bracket } from './Bracket';
import { Coda } from './Coda';
import { Dashes } from './Dashes';
import { Dynamics } from './Dynamics';
import { Metronome } from './Metronome';
import { Pedal } from './Pedal';
import { Rehearsal } from './Rehearsal';
import { Segno } from './Segno';
import { Symbol } from './Symbol';
import { Wedge } from './Wedge';
import { Words } from './Words';

/**
 * The `<direction-type>` element
 *
 * Parent element: `<direction>`
 *
 * Textual direction types may have more than 1 component due to multiple fonts. The `<dynamics>` element may also be
 * used in the `<notations>` element. Child element attributes related to print suggestions apply to the individual
 * `<direction-type>`, not to the overall `<direction>`.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/direction-type/}
 */
export type DirectionType = ReturnType<typeof DirectionType>;

export const DirectionType = xml.element(
  'direction-type',
  {
    attributes: {},
    content: [
      t.choices(
        t.oneOrMore(Rehearsal),
        t.oneOrMore(Segno),
        t.oneOrMore(Coda),
        t.oneOrMore(t.choices(Words, Symbol)),
        Wedge,
        t.oneOrMore(Dynamics),
        Dashes,
        Bracket,
        Pedal,
        Metronome
      ),
    ] as const,
  },
  {}
);
