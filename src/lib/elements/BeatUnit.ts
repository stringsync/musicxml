import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<beat-unit>` element
 *
 * Parent elements: `<beat-unit-tied>`, `<metronome>`
 *
 * The `<beat-unit>` element indicates the graphical note type to use in a metronome mark.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/beat-unit/}
 */
export type BeatUnit = ReturnType<typeof BeatUnit>;

export const BeatUnit = xml.element(
  'beat-unit',
  { attributes: {}, content: [t.required(dataTypes.noteTypeValue())] as const },
  {}
);
