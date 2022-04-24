import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { AccidentalMark } from './AccidentalMark';
import { DelayedInvertedTurn } from './DelayedInvertedTurn';
import { DelayedTurn } from './DelayedTurn';
import { Haydn } from './Haydn';
import { InvertedMordent } from './InvertedMordent';
import { InvertedTurn } from './InvertedTurn';
import { InvertedVerticalTurn } from './InvertedVerticalTurn';
import { Mordent } from './Mordent';
import { OtherOrnament } from './OtherOrnament';
import { Schleifer } from './Schleifer';
import { Shake } from './Shake';
import { Tremolo } from './Tremolo';
import { TrillMark } from './TrillMark';
import { Turn } from './Turn';
import { VerticalTurn } from './VerticalTurn';
import { WavyLine } from './WavyLine';

/**
 * The `<ornaments>` element
 *
 * Parent element: `<notations>`
 *
 * Ornaments can be any of several types, followed optionally by accidentals. The `<accidental-mark>` element's content
 * is represented the same as an `<accidental>` element, but with a different name to reflect the different musical
 * meaning.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/ornaments/}
 */
export const Ornaments = schema(
  'ornaments',
  {
    /**
     * Specifies an ID that is unique to the entire document.
     */
    id: t.optional(dataTypes.id()),
  },
  [
    t.label({
      label: 'values',
      value: t.zeroOrMore(
        t.choices(
          TrillMark,
          Turn,
          DelayedTurn,
          InvertedTurn,
          DelayedInvertedTurn,
          VerticalTurn,
          InvertedVerticalTurn,
          Shake,
          WavyLine,
          Mordent,
          InvertedMordent,
          Schleifer,
          Tremolo,
          Haydn,
          OtherOrnament
        )
      ),
    }),
    t.label({ label: 'accidental-marks', value: t.zeroOrMore(AccidentalMark) }),
  ] as const
);
