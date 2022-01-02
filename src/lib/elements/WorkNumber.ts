import * as dataTypes from '../dataTypes';
import { xml } from '../xml';

/**
 * The `<work-number>` element
 *
 * Parent element: `<work>`
 *
 * The `<work-number>` element specifies the number of a work, such as its opus number.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/work-number/}
 */
export type WorkNumber = ReturnType<typeof WorkNumber>;

export const WorkNumber = xml.element('work-number', { attributes: {}, content: [dataTypes.string()] as const }, {});
