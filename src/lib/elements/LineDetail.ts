import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<line-detail>` element
 *
 * Parent element: `<staff-details>`
 *
 * If the `<staff-lines>` element is present, the appearance of each line may be individually specified with a
 * `<line-detail>` element.
 *
 * The print-object attribute allows lines to be hidden within a staff. This is used in special situations such as a
 * widely-spaced percussion staff where a note placed below the higher line is distinct from a note placed above the
 * lower line. Hidden staff lines are included when specifying clef lines and determining `<display-step>` /
 * `<display-octave>` values, but are not counted as lines for the purposes of the `<system-layout>` and
 * `<staff-layout>` elements.
 *
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/line-detail/}
 */
export type LineDetail = ReturnType<typeof LineDetail>;

export const LineDetail = xml.element(
  'line-detail',
  {
    attributes: {
      /**
       * Indicates the staff line affected, numbered from bottom to top.
       */
      line: t.required(dataTypes.staffLine()),

      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

      /**
       * Specifies if the line is solid, dashed, dotted, or wavy.
       */
      ['line-type']: t.optional(dataTypes.lineType()),

      /**
       * Specifies whether or not to print an object. It is yes if not specified.
       */
      ['print-object']: t.optional(dataTypes.yesNo()),

      /**
       * Staff line width in tenths.
       */
      width: t.optional(dataTypes.tenths()),
    },
    content: [] as const,
  },
  {}
);
