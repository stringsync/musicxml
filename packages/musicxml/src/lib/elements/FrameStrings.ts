import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<frame-strings>` element
 *
 * Parent element: `<frame>`
 *
 * The `<frame-strings>` element gives the overall size of the frame in vertical lines (strings).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/frame-strings/}
 */
export const FrameStrings = schema('frame-strings', {}, [
  t.label({ label: 'lines-size', value: t.required(dataTypes.positiveInteger()) }),
] as const);
