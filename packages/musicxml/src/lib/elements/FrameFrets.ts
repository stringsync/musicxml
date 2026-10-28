import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<frame-frets>` element
 *
 * Parent element: `<frame>`
 *
 * The frame-frets element gives the overall size of the frame in horizontal spaces (frets).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/frame-frets/}
 */
export const FrameFrets = schema('frame-frets', {}, [
  t.label({ label: 'space-size', value: t.required(dataTypes.positiveInteger()) }),
] as const);
