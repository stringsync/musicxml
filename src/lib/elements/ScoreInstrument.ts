import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { Ensemble } from './Ensemble';
import { InstrumentAbbreviation } from './InstrumentAbbreviation';
import { InstrumentName } from './InstrumentName';
import { InstrumentSound } from './InstrumentSound';
import { Solo } from './Solo';
import { VirtualInstrument } from './VirtualInstrument';

/**
 * Parent element: `<score-part>`
 *
 * The `<score-instrument>` element represents a single instrument within a `<score-part>`. As with the `<score-part>`
 * element, each `<score-instrument>` has a required ID attribute, a name, and an optional abbreviation.
 *
 * A `<score-instrument>` element is also required if the score specifies MIDI 1.0 channels, banks, or programs. An
 * initial `<midi-instrument>` assignment can also be made here. MusicXML software should be able to automatically
 * assign reasonable channels and instruments without these elements in simple cases, such as where part names match
 *  General MIDI instrument names.
 *
 * The `<score-instrument>` element can also distinguish multiple instruments of the same type that are on the same
 * part, such as Clarinet 1 and Clarinet 2 instruments within a Clarinets 1 and 2 part.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/score-instrument/}
 */
export type ScoreInstrument = ReturnType<typeof ScoreInstrument>;

export const ScoreInstrument = xml.element(
  'score-instrument',
  {
    attributes: {
      /**
       * An identifier for this `<score-instrument>` that is unique to this document.
       */
      id: t.required(dataTypes.id()),
    },
    content: [
      t.required(InstrumentName),
      t.optional(InstrumentAbbreviation),
      t.optional(InstrumentSound),
      t.label({ label: 'instrument-type', value: t.zeroOrMore(t.choices(Solo, Ensemble)) }),
      t.optional(VirtualInstrument),
    ] as const,
  },
  {}
);
