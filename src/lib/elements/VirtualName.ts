import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<virtual-name>` element
 *
 * Parent element: `<virtual-instrument>`
 *
 * The `<virtual-name>` element indicates the library-specific name for the virtual instrument.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/virtual-name/}
 */
export type VirtualName = ReturnType<typeof VirtualName>;

export const VirtualName = xml.element(
  'virtual-name',
  { attributes: {}, content: [t.required(dataTypes.string())] as const },
  {}
);
