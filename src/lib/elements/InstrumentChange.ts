import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { Ensemble } from './Ensemble';
import { InstrumentSound } from './InstrumentSound';
import { Solo } from './Solo';
import { VirtualInstrument } from './VirtualInstrument';

/**
 * The `<instrument-change>` element
 *
 * Parent element: `<sound>`
 *
 * The `<instrument-change>` element type represents a change to the virtual instrument sound for a given
 * `<score-instrument>`. All `<instrument-change>` child elements can also be initially specified within the
 * `<score-instrument>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/instrument-change/}
 */
export const InstrumentChange = schema(
  'instrument-change',
  {
    /**
     * Refers to the `<score-instrument>` affected by the change.
     */
    id: t.required(dataTypes.idref()),
  },
  [
    t.optional(InstrumentSound),
    t.label({ label: 'instrument-type', value: t.zeroOrMore(t.choices(Solo, Ensemble)) }),
    t.optional(VirtualInstrument),
  ] as const
);
