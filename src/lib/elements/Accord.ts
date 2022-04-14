import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { TuningAlter } from './TuningAlter';
import { TuningOctave } from './TuningOctave';
import { TuningStep } from './TuningStep';

/**
 * The `<accord>` element
 *
 * Parent element: `<scordatura>`
 *
 * The `<accord>` element represents the tuning of a single string in the `<scordatura>` element. It uses the same group
 * of elements as the `<staff-tuning>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/accord/}
 */
export const Accord = schema(
  'accord',
  {
    string: t.optional(dataTypes.stringNumber()),
  },
  [t.required(TuningStep), t.optional(TuningAlter), t.required(TuningOctave)]
);
