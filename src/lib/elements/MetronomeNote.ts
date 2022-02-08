import { schema, t } from '../schema';
import { MetronomeBeam } from './MetronomeBeam';
import { MetronomeDot } from './MetronomeDot';
import { MetronomeTied } from './MetronomeTied';
import { MetronomeTuplet } from './MetronomeTuplet';
import { MetronomeType } from './MetronomeType';

/**
 * The `<metronome-note>` element
 *
 * Parent element: `<metronome>`
 *
 * The `<metronome-note>` element defines the appearance of a note within a metric relationship mark.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/metronome-note/}
 */
export const MetronomeNote = schema('metronome-note', {}, [
  t.required(MetronomeType),
  t.label({ label: 'metronome-dots', value: t.zeroOrMore(MetronomeDot) }),
  t.label({ label: 'metronome-beams', value: t.zeroOrMore(MetronomeBeam) }),
  t.optional(MetronomeTied),
  t.optional(MetronomeTuplet),
] as const);
