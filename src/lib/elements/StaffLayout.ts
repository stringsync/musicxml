import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { StaffDistance } from './StaffDistance';

/**
 * The `<defaults>` element
 *
 * Parent elements: `<score-partwise version="4.0">`, `<score-timewise>`
 *
 * The `<defaults>` element specifies score-wide defaults for scaling; whether or not the file is a concert score;
 * layout; and default values for the music font, word font, lyric font, and lyric language. Except for the
 * `<concert-score>` element, if any defaults are missing, the choice of what to use is determined by the application.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/defaults/}
 */
export const StaffLayout = schema(
  'staff-layout',
  {
    /**
     * Refers to staff numbers within the part, from top to bottom on the system. A value of 1 is used if not present.
     */
    number: t.optional(dataTypes.staffNumber()),
  },
  [t.optional(StaffDistance)] as const
);
