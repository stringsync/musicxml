import { t, xml } from '../xml';
import { VirtualLibrary } from './VirtualLibrary';
import { VirtualName } from './VirtualName';

/**
 * The `<virtual-instrument>` element
 *
 * Parent elements: `<instrument-change>`, `<score-instrument>`
 *
 * The `<virtual-instrument>` element defines a specific virtual instrument used for an `<instrument sound>`.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/virtual-instrument/}
 */
export type VirtualInstrument = ReturnType<typeof VirtualInstrument>;

export const VirtualInstrument = xml.element(
  'virtual-instrument',
  { attributes: {}, content: [t.optional(VirtualLibrary), t.optional(VirtualName)] as const },
  {}
);
