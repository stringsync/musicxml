import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<step>` element
 *
 * Parent element: `<pitch>`
 *
 * The `<step>` element represents a step of the diatonic scale, represented using the English letters A through G.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/step/}
 */
export type Step = ReturnType<typeof Step>;

export const Step = xml.element('step', { attributes: {}, content: [t.required(dataTypes.step())] as const }, {});
