import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<frame-frets>` element
 *
 * Parent element: `<frame>`
 *
 * The frame-frets element gives the overall size of the frame in horizontal spaces (frets).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/frame-frets/}
 */
export type FrameFrets = ReturnType<typeof FrameFrets>;

export const FrameFrets = xml.element(
  'frame-frets',
  { attributes: {}, content: [t.required(dataTypes.positiveInteger())] as const },
  {}
);
