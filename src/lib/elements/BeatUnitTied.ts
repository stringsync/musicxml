import { t, xml } from '../xml';
import { BeatUnit } from './BeatUnit';
import { BeatUnitDot } from './BeatUnitDot';

/**
 * The `<beat-unit-tied>` element
 *
 * Parent element: `<metronome>`
 *
 * The `<beat-unit-tied>` element indicates a `<beat-unit>` within a metronome mark that is tied to the preceding
 * `<beat-unit>`. This allows two or more tied notes to be associated with a per-minute value in a metronome mark,
 * whereas the `<metronome-tied>` element is restricted to metric relationship marks.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/beat-unit-tied/}
 */
export type BeatUnitTied = ReturnType<typeof BeatUnitTied>;

export const BeatUnitTied = xml.element(
  'beat-unit-tied',
  {
    attributes: {},
    content: [t.required(BeatUnit), t.label({ label: 'beat-unit-dots', value: t.zeroOrMore(BeatUnitDot) })] as const,
  },
  {}
);
