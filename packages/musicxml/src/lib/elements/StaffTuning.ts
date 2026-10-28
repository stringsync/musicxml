import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { TuningAlter } from './TuningAlter';
import { TuningOctave } from './TuningOctave';
import { TuningStep } from './TuningStep';

/**
 * The `<staff-tuning>` element
 *
 * Parent element: `<staff-details>`
 *
 * The `<staff-tuning>` element specifies the open, non-capo tuning of the lines on a tablature staff.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/staff-details/}
 */
export const StaffTuning = schema(
  'staff-tuning',
  {
    /**
     * Indicates the staff line for this tuning, numbered from bottom to top.
     */
    line: t.required(dataTypes.staffLine()),
  },
  [t.required(TuningStep), t.optional(TuningAlter), t.required(TuningOctave)] as const
);
