import { t, xml } from '../xml';
import { Group } from './Group';
import { Identification } from './Identification';
import { MidiDevice } from './MidiDevice';
import { MidiInstrument } from './MidiInstrument';
import { PartAbbreviation } from './PartAbbreviation';
import { PartAbbreviationDisplay } from './PartAbbreviationDisplay';
import { PartLink } from './PartLink';
import { PartName } from './PartName';
import { PartNameDisplay } from './PartNameDisplay';
import { Player } from './Player';
import { ScoreInstrument } from './ScoreInstrument';

/**
 * The `<score-part>` element
 *
 * Parent element: `<part-list>`
 *
 * The `<score-part>` element collects part-wide information for each part in a score. Often each MusicXML part
 * corresponds to a track in a Standard MIDI Format 1 file. In this case, the `<midi-device>` element is used to make a
 * MIDI device or port assignment for the given track or specific MIDI instruments. Initial `<midi-instrument>`
 * assignments may be made here as well.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/score-part/}
 */
export type ScorePart = ReturnType<typeof ScorePart>;

export const ScorePart = xml.element(
  'score-part',
  {
    attributes: {},
    content: [
      t.optional(Identification),
      t.label({ label: 'part-links', value: t.zeroOrMore(PartLink) }),
      t.required(PartName),
      t.optional(PartNameDisplay),
      t.optional(PartAbbreviation),
      t.optional(PartAbbreviationDisplay),
      t.label({ label: 'groups', value: t.zeroOrMore(Group) }),
      t.label({ label: 'score-instruments', value: t.zeroOrMore(ScoreInstrument) }),
      t.label({ label: 'players', value: t.zeroOrMore(Player) }),
      t.label({ label: 'midis', value: t.zeroOrMore(t.choices(MidiDevice, MidiInstrument)) }),
    ] as const,
  },
  {}
);
