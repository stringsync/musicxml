import { t, xml } from '../xml';

/**
 * Parent element: `<page-layout>`
 *
 * The `<page-width>` element specifies the page width in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/page-width/}
 */
export type PageWidth = ReturnType<typeof PageWidth>;

export const PageWidth = xml.element('page-width', { attributes: {}, content: [t.required(t.float())] as const }, {});