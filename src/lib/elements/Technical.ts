import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { Arrow } from './Arrow';
import { Bend } from './Bend';
import { DoubleTongue } from './DoubleTongue';
import { DownBow } from './DownBow';
import { Fingering } from './Fingering';
import { Fingernails } from './Fingernails';
import { Fret } from './Fret';
import { HammerOn } from './HammerOn';
import { Harmonic } from './Harmonic';
import { Heel } from './Heel';
import { Hole } from './Hole';
import { OpenString } from './OpenString';
import { Pluck } from './Pluck';
import { PullOff } from './PullOff';
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
export type Technical = ReturnType<typeof Technical>;

export const Technical = xml.element(
  'technical',
  {
    attributes: {
      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),
    },
    content: [
      t.zeroOrMore(
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
          Arrow
        )
      ),
    ] as const,
  },
  {}
);
