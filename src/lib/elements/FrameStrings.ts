import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<frame-strings>` element
 *
 * Parent element: `<frame>`
 *
 * The `<frame-strings>` element gives the overall size of the frame in vertical lines (strings).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/frame-strings/}
 */
export type FrameStrings = ReturnType<typeof FrameStrings>;

export const FrameStrings = xml.element(
  'frame-strings',
  { attributes: {}, content: [t.required(dataTypes.positiveInteger())] as const },
  {}
);
