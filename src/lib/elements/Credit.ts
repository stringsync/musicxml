import { element } from '../xml';

export type Credit = ReturnType<typeof Credit>;

/**
 * Parent elements: `<score-partwise>`, `<score-timewise>`
 *
 * The `<credit>` element represents the appearance of the title, composer, arranger, lyricist, copyright, dedication,
 * and other text, symbols, and graphics that commonly appear on the first page of a score. The `<credit-words>`,
 * `<credit-symbol>`, and `<credit-image>` elements are similar to the `<words>`, `<symbol>`, and `<image>` elements for
 * directions. However, since the credit is not part of a measure, the default-x and default-y attributes adjust the
 * origin relative to the bottom left-hand corner of the page. The enclosure for `<credit-words>` and `<credit-symbol>`
 * is none if not specified.
 *
 * By default, a series of `<credit-words>` and `<credit-symbol>` elements within a single `<credit>` element follow one
 * another in sequence visually. Non-positional formatting attributes are carried over from the previous element by
 * default.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/credit/}
 */
export const Credit = element('credit', {
  attributes: {},
  content: [],
});
