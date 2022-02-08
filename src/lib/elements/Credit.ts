import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { Bookmark } from './Bookmark';
import { CreditImage } from './CreditImage';
import { CreditSymbol } from './CreditSymbol';
import { CreditType } from './CreditType';
import { CreditWords } from './CreditWords';
import { Link } from './Link';

/**
 * The `<credit>` element
 *
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
export const Credit = schema(
  'credit',
  {
    /**
     * Specifies an ID that is unique to the entire document.
     */
    id: t.optional(dataTypes.id()),

    /**
     * Specifies the page number where the `<credit>` should appear. This is an integer value that starts with 1 for
     * the first page. Its value is 1 if not specified. Since credits occur before the music, these page numbers do
     * not refer to the page numbering specified by the `<print>` element's page-number attribute.
     */
    page: t.optional(dataTypes.positiveInteger()),
  },
  [
    t.label({ label: 'credit-types', value: t.zeroOrMore(CreditType) }),
    t.label({ label: 'links', value: t.zeroOrMore(Link) }),
    t.label({ label: 'bookmarks', value: t.zeroOrMore(Bookmark) }),
    t.label({
      label: 'credit-detail',
      value: t.choices(CreditImage, [
        t.choices(CreditWords, CreditSymbol),
        t.zeroOrMore([t.zeroOrMore(Link), t.zeroOrMore(Bookmark), t.choices(CreditWords, CreditSymbol)] as const),
      ] as const),
    }),
  ] as const
);
