import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<type>` element
 *
 * Parent element: `<note>`
 *
 * The `<type>` element indicates the graphic note type. Values range from 1024th to maxima.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/type/}
 */
export type Type = ReturnType<typeof Type>;

export const Type = xml.element(
  'type',
  {
    attributes: {
      /**
       * Indicates full, cue, grace-cue, or large size. If not specified, the value is full for regular notes, grace-cue
       * for notes that contain both `<grace>` and `<cue>` elements, and cue for notes that contain either a `<cue>` or
       * a `<grace>` element, but not both.
       */
      size: t.optional(dataTypes.symbolSize()),
    },
    content: [t.required(dataTypes.noteTypeValue())] as const,
  },
  {}
);
