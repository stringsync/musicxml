import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<beats>` element
 *
 * Parent elements: `<interchangeable>`, `<time>`
 *
 * The `<beats>` element indicates the number of beats, as found in the numerator of a time signature.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/beats/}
 */
export type Beats = ReturnType<typeof Beats>;

export const Beats = xml.element('beats', { attributes: {}, content: [t.required(dataTypes.string())] as const }, {});
