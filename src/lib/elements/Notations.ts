import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { AccidentalMark } from './AccidentalMark';
import { Arpeggiate } from './Arpeggiate';
import { Articulations } from './Articulations';
import { Dynamics } from './Dynamics';
import { Fermata } from './Fermata';
import { Footnote } from './Footnote';
import { Glissando } from './Glissando';
import { Level } from './Level';
import { NonArpeggiate } from './NonArpeggiate';
import { Ornaments } from './Ornaments';
import { OtherNotation } from './OtherNotation';
import { Slide } from './Slide';
import { Slur } from './Slur';
import { Technical } from './Technical';
import { Tied } from './Tied';
import { Tuplet } from './Tuplet';

/**
 * The `<notations>` element
 *
 * Parent element: `<note>`
 *
 * The `<notations>` element collects musical notations that apply to a specific note or chord. Multiple `<notations>`
 * elements are allowed in order to represent multiple editorial levels. The print-object attribute allows `<notations>`
 * to represent details of performance technique, such as fingerings, without having them appear in the score. This
 * element is not related to the concept of XML notations.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/notations/}
 */
export type Notations = ReturnType<typeof Notations>;

export const Notations = xml.element(
  'notations',
  {
    attributes: {
      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

      /**
       * Specifies whether or not to print an object. It is yes if not specified.
       */
      ['print-object']: t.optional(dataTypes.yesNo()),
    },
    content: [
      t.optional(Footnote),
      t.optional(Level),
      t.zeroOrMore(
        t.choices(
          Tied,
          Slur,
          Tuplet,
          Glissando,
          Slide,
          Ornaments,
          Technical,
          Articulations,
          Dynamics,
          Fermata,
          Arpeggiate,
          NonArpeggiate,
          AccidentalMark,
          OtherNotation
        )
      ),
    ] as const,
  },
  {}
);
