import { t, xml } from '../xml';

/**
 * The `<work-title>` element
 *
 * Parent element: `<work>`
 *
 * The `<work-title>` element specifies the title of a work, not including its opus or other work number.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/work-title/}
 */
export type WorkTitle = ReturnType<typeof WorkTitle>;

export const WorkTitle = xml.element('work-title', { attributes: {}, content: [t.string()] as const }, {});
