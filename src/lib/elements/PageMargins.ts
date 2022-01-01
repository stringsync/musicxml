import { t, xml } from '../xml';
import { BottomMargin } from './BottomMargin';
import { LeftMargin } from './LeftMargin';
import { RightMargin } from './RightMargin';
import { TopMargin } from './TopMargin';

/**
 * Parent element: `<page-layout>`
 *
 * The `<page-margins>` element specifies page margins in tenths either for both even and odd pages, or via separate odd
 * and even page number values.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/page-margins/}
 */
export type PageMargins = ReturnType<typeof PageMargins>;

export const PageMargins = xml.element(
  'page-margins',
  {
    attributes: { type: t.optional(t.choices('both' as const, 'even' as const, 'odd' as const)) },
    content: [
      t.required(LeftMargin),
      t.required(RightMargin),
      t.required(TopMargin),
      t.required(BottomMargin),
    ] as const,
  },
  {}
);
