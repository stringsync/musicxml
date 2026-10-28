import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<slash-type>` element
 *
 * Parent elements: `<beat-repeat>`, `<slash>`
 *
 * The `<slash-type>` element indicates the graphical note type to use for the display of repetition marks.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/slash-type/}
 */
export const SlashType = schema('slash-type', {}, [t.required(dataTypes.noteTypeValue())] as const);
