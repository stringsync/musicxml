import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<except-voice>` element
 *
 * Parent elements: `<beat-repeat>`, `<slash>`
 *
 * The `<except-voice>` element is used to specify a combination of slash notation and regular notation. Any `<note>`
 * elements that are in voices specified by the `<except-voice>` elements are displayed in normal notation, in addition
 * to the slash notation that is always displayed.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/except-voice/}
 */
export const ExceptVoice = schema('except-voice', {}, [t.required(dataTypes.string())] as const);
