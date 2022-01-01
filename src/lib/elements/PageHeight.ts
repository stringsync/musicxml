import { t, xml } from '../xml';

/**
 * The `<page-height>` element
 *
 * Parent element: `<page-layout>`
 *
 * The `<page-height>` element specifies the page height in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/page-height/}
 */
export type PageHeight = ReturnType<typeof PageHeight>;

export const PageHeight = xml.element('page-height', { attributes: {}, content: [t.required(t.float())] as const }, {});
