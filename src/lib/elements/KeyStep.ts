import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<key>` element
 *
 * Parent element: `<attributes>`
 *
 * The `<key>` element represents a key signature. Both traditional and non-traditional key signatures are supported.
 * Key signatures appear at the start of each system unless the print-object attribute has been set to "no".
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/key/}
 */
export type KeyStep = ReturnType<typeof KeyStep>;

export const KeyStep = xml.element(
  'key-step',
  { attributes: {}, content: [t.required(dataTypes.step())] as const },
  {}
);
