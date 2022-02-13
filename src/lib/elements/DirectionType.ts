import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { AccordionRegistration } from './AccordionRegistration';
import { Bracket } from './Bracket';
import { Coda } from './Coda';
import { Damp } from './Damp';
import { DampAll } from './DampAll';
import { Dashes } from './Dashes';
import { Dynamics } from './Dynamics';
import { Eyeglasses } from './Eyeglasses';
import { HarpPedals } from './HarpPedals';
import { Image } from './Image';
import { Metronome } from './Metronome';
import { OctaveShift } from './OctaveShift';
import { OtherDirection } from './OtherDirection';
import { Pedal } from './Pedal';
import { Percussion } from './Percussion';
import { PrincipalVoice } from './PrincipalVoice';
import { Rehearsal } from './Rehearsal';
import { Scordatura } from './Scordatura';
import { Segno } from './Segno';
import { StaffDivide } from './StaffDivide';
import { StringMute } from './StringMute';
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
export const DirectionType = schema(
  'direction-type',
  {
    /**
     * Specifies an ID that is unique to the entire document.
     */
    id: t.optional(dataTypes.id()),
  },
  [
    t.label({
      label: 'direction-type',
      value: t.choices(
        t.label({ label: 'rehearsals', value: t.oneOrMore(Rehearsal) }),
        t.label({ label: 'segnos', value: t.oneOrMore(Segno) }),
        t.label({ label: 'codas', value: t.oneOrMore(Coda) }),
        t.label({ label: 'tokens', value: t.oneOrMore(t.choices(Words, Symbol)) }),
        Wedge,
        t.label({ label: 'dynamics', value: t.oneOrMore(Dynamics) }),
        Dashes,
        Bracket,
        Pedal,
        Metronome,
        OctaveShift,
        HarpPedals,
        Damp,
        DampAll,
        Eyeglasses,
        StringMute,
        Scordatura,
        Image,
        PrincipalVoice,
        t.label({ label: 'percussions', value: t.oneOrMore(Percussion) }),
        AccordionRegistration,
        StaffDivide,
        OtherDirection
      ),
    }),
  ] as const
);
