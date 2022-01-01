import { xml } from '../xml';

/**
 * Parent elements: `<page-margins>`, `<system-margins>`
 *
 * The `<right-margin>` element specifies the right margin for the parent element in tenths.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/right-margin/}
 */
export type RightMargin = ReturnType<typeof RightMargin>;

export const RightMargin = xml.element('right-margin', { attributes: {}, content: [] as const }, {});
