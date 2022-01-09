import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<metronome-type>` element
 *
 * Parent element: `<metronome-note>`
 *
 * The `<metronome-type>` element works like the `<type>` element in defining metric relationships.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/metronome-type/}
 */
export type MetronomeType = ReturnType<typeof MetronomeType>;

export const MetronomeType = xml.element(
  'metronome-type',
  { attributes: {}, content: [t.required(dataTypes.noteTypeValue())] as const },
  {}
);
