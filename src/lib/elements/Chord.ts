import { schema } from '../schema';

/**
 * The `<chord>` element
 *
 * Parent element: `<note>`
 *
 * The `<chord>` element indicates that this note is an additional chord tone with the preceding note.
 *
 * The `<duration>` of a `<chord>` note does not move the musical position within a `<measure>`. That is done by the
 * `<duration>` of the first preceding note without a `<chord>` element. Thus the `<duration>` of a `<chord>` note
 * cannot be longer than the preceding note.
 *
 * In most cases the `<duration>` will be the same as the preceding note. However it can be shorter in situations such
 * as multiple stops for string instruments. Here is an example from Mozart's Concerto No. 3 for Violin, K. 216:
 *
 * If these first three notes are represented as a chord, the quarter notes must be the ones with the `<chord>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/chord/}
 */
export const Chord = schema('chord', {}, [] as const);
