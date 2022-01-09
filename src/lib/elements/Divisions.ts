import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<divisions>` element
 *
 * Parent element: `<attributes>`
 *
 * Musical notation duration is commonly represented as fractions. The `<divisions>` element indicates how many
 * divisions per quarter note are used to indicate a note's duration. For example, if duration = 1 and divisions = 2,
 * this is an eighth note duration. Duration and divisions are used directly for generating sound output, so they must
 * be chosen to take tuplets into account.
 *
 * Using a `<divisions>` element lets us use just one number to represent a duration for each note in the score, while
 * retaining the full power of a fractional representation. If maximum compatibility with Standard MIDI 1.0 files is
 * important, do not have the divisions value exceed 16383.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/divisions/}
 */
export type Divisions = ReturnType<typeof Divisions>;

export const Divisions = xml.element(
  'divisions',
  { attributes: {}, content: [t.required(dataTypes.positiveDivisions())] as const },
  {}
);
