import { t, xml } from '../xml';

/**
 * Parent element: `<work>`
 *
 * The `<work-number>` element specifies the number of a work, such as its opus number.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/work-number/}
 */
export const WorkNumber = xml.element('work-number', { attributes: {}, content: [t.string()] }, {});
