import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { Arrow } from './Arrow';
import { Bend } from './Bend';
import { BrassBend } from './BrassBend';
import { DoubleTongue } from './DoubleTongue';
import { DownBow } from './DownBow';
import { Fingering } from './Fingering';
import { Fingernails } from './Fingernails';
import { Flip } from './Flip';
import { Fret } from './Fret';
import { Golpe } from './Golpe';
import { HalfMuted } from './HalfMuted';
import { HammerOn } from './HammerOn';
import { Handbell } from './Handbell';
import { Harmonic } from './Harmonic';
import { HarmonMute } from './HarmonMute';
import { Heel } from './Heel';
import { Hole } from './Hole';
import { Open } from './Open';
import { OpenString } from './OpenString';
import { OtherTechnical } from './OtherTechnical';
import { Pluck } from './Pluck';
import { PullOff } from './PullOff';
import { Smear } from './Smear';
import { SnapPizzicato } from './SnapPizzicato';
import { Stopped } from './Stopped';
import { String } from './String';
import { Tap } from './Tap';
import { ThumbPosition } from './ThumbPosition';
import { Toe } from './Toe';
import { TripleTongue } from './TripleTongue';
import { UpBow } from './UpBow';

/**
 * The `<technical>` element
 *
 * Parent element: `<notations>`
 *
 * The `<technical>` element groups together technical indications that give performance information for specific
 * instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/technical/}
 */
export const Technical = schema(
  'technical',
  {
    /**
     * Specifies an ID that is unique to the entire document.
     */
    id: t.optional(dataTypes.id()),
  },
  [
    t.label({
      label: 'technicals',
      value: t.zeroOrMore(
        t.choices(
          UpBow,
          DownBow,
          Harmonic,
          OpenString,
          ThumbPosition,
          Fingering,
          Pluck,
          DoubleTongue,
          TripleTongue,
          Stopped,
          SnapPizzicato,
          Fret,
          String,
          HammerOn,
          PullOff,
          Bend,
          Tap,
          Heel,
          Toe,
          Fingernails,
          Hole,
          Arrow,
          Handbell,
          BrassBend,
          Flip,
          Smear,
          Open,
          HalfMuted,
          HarmonMute,
          Golpe,
          OtherTechnical
        )
      ),
    }),
  ] as const
);
