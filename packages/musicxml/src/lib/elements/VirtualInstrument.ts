import { schema, t } from '../schema';
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
export const VirtualInstrument = schema('virtual-instrument', {}, [
  t.optional(VirtualLibrary),
  t.optional(VirtualName),
] as const);
