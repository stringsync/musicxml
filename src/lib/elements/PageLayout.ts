import { t, xml } from '../xml';
import { PageHeight } from './PageHeight';
import { PageWidth } from './PageWidth';

/**
 * Parent elements: `<defaults>`, `<print>`
 *
 * Page layout can be defined both in score-wide `<defaults>` and in the `<print>` element. If no `<page-layout>`
 * element is present in the `<defaults>` element, default page layout values are chosen by the application.
 *
 * When used in the `<print>` element, the `<page-layout>` element affects the appearance of the current page only. All
 * other pages use the default values as determined by the `<defaults>` element. If any child elements are missing from
 * the `<page-layout>` element in a `<print>` element, the values determined by the <defaults> element are used there
 * as well.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/page-layout/}
 */
export type PageLayout = ReturnType<typeof PageLayout>;

export const PageLayout = xml.element(
  'page-layout',
  { attributes: {}, content: [t.optional(PageHeight), t.optional(PageWidth)] as const },
  {}
);
