import { schema, t } from '../schema';
import { BottomMargin } from './BottomMargin';
import { LeftMargin } from './LeftMargin';
import { RightMargin } from './RightMargin';
import { TopMargin } from './TopMargin';

/**
 * The `<page-margins>` element
 *
 * Parent element: `<page-layout>`
 *
 * The `<page-margins>` element specifies page margins in tenths either for both even and odd pages, or via separate odd
 * and even page number values.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/page-margins/}
 */
export const PageMargins = schema(
  'page-margins',
  {
    /**
     * 	Specifies whether the margins apply to even pages, odd pages, or both. This attribute is not needed when used
     * as part of a `<print>` element. The value is both if omitted when used in the `<defaults>` element.
     */
    type: t.optional(t.choices('both' as const, 'even' as const, 'odd' as const)),
  },
  [t.required(LeftMargin), t.required(RightMargin), t.required(TopMargin), t.required(BottomMargin)] as const
);
