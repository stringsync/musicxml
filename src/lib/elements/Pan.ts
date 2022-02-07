import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<pan>` element
 *
 * Parent element: `<midi-instrument>`\
 *
 * The `<pan>` and `<elevation>` elements allow placing of sound in a 3-D space relative to the listener. Both are
 * expressed in degrees ranging from -180 to 180. For pan, 0 is straight ahead, -90 is hard left, 90 is hard right, and
 * -180 and 180 are directly behind the listener.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/pan/}
 */
export type Pan = ReturnType<typeof Pan>;

export const Pan = xml.element(
  'pan',
  { attributes: {}, content: [t.label({ label: 'pan', value: t.required(dataTypes.rotationDegrees()) })] as const },
  {}
);
