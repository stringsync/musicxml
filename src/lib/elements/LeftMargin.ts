import { t, xml } from '../xml';

/**
 * Parent elements: `<page-margins>`, `<system-margins>`
 *
 * The `<left-margin>` element specifies the left margin for the parent element in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/left-margin/}
 */
export type LeftMargin = ReturnType<typeof LeftMargin>;

export const LeftMargin = xml.element('left-margin', { attributes: {}, content: [t.required(t.float())] as const }, {});
