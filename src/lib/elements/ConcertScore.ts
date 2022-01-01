import { xml } from '../xml';

/**
 * Parent element: `<defaults>`
 *
 * The presence of a `<concert-score>` element indicates that a score is displayed in concert pitch. It is used for
 * scores that contain parts for transposing instruments.
 *
 * A document with a `<concert-score>` element may not contain any `<transpose>` elements that have non-zero values for
 * either the `<diatonic>` or `<chromatic>` elements. Concert scores may include octave transpositions, so `<transpose>`
 * elements with a `<double>` element or a non-zero `<octave-change>` element value are permitted.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/concert-score/}
 */
export type ConcertScore = ReturnType<typeof ConcertScore>;

export const ConcertScore = xml.element('concert-score', { attributes: {}, content: [] as const }, {});
