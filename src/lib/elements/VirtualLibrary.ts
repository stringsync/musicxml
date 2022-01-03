import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<virtual-library>` element
 *
 * Parent element: `<virtual-instrument>`
 *
 * The `<virtual-library>` element indicates the virtual instrument library name.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/virtual-library/}
 */
export type VirtualLibrary = ReturnType<typeof VirtualLibrary>;

export const VirtualLibrary = xml.element(
  'virtual-library',
  { attributes: {}, content: [t.required(dataTypes.string())] as const },
  {}
);
