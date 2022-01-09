import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { Capo } from './Capo';
import { LineDetail } from './LineDetail';
import { StaffLines } from './StaffLines';
import { StaffSize } from './StaffSize';
import { StaffTuning } from './StaffTuning';
import { StaffType } from './StaffType';

/**
 * The `<staff-details>` element
 *
 * Parent element: `<attributes>`
 *
 * The `<staff-details>` element is used to indicate different types of staves.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/staff-details/}
 */
export type StaffDetails = ReturnType<typeof StaffDetails>;

export const StaffDetails = xml.element(
  'staff-details',
  {
    attributes: {
      /**
       * Specifies the staff number from top to bottom within the part. The value is 1 if not present.
       */
      number: t.optional(dataTypes.staffNumber()),

      /**
       * Specifies whether or not to print an object. It is yes if not specified.
       */
      ['print-object']: t.optional(dataTypes.yesNo()),

      /**
       * Controls whether or not spacing is left for an invisible note or object. It is used only if no note, dot, or
       * lyric is being printed. The value is yes (leave spacing) if not specified.
       */
      ['print-spacing']: t.optional(dataTypes.yesNo()),

      /**
       * Indicates whether to show tablature frets as numbers (0, 1, 2) or letters (a, b, c). It is numbers if not
       * specified.
       */
      ['show-frets']: t.optional(dataTypes.showFrets()),
    },
    content: [
      t.optional(StaffType),
      t.optional([t.required(StaffLines), t.zeroOrMore(LineDetail)]),
      t.zeroOrMore(StaffTuning),
      t.optional(Capo),
      t.optional(StaffSize),
    ] as const,
  },
  {}
);
