import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { Chromatic } from './Chromatic';
import { Diatonic } from './Diatonic';
import { Double } from './Double';
import { OctaveChange } from './OctaveChange';

/**
 * The `<transpose>` element
 *
 * Parent element: `<attributes>`
 *
 * The `<transpose>` element represents what must be added to a written pitch to get a correct sounding pitch. It is
 * used for encoding parts for transposing instruments that are in written vs. concert pitch.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/transpose/}
 */
export type Transpose = ReturnType<typeof Transpose>;

export const Transpose = xml.element(
  'transpose',
  {
    attributes: {
      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

      /**
       * Allows a transposition to apply to only the specified staff in the part. If absent, the transposition applies
       * to all staves in the part. Per-staff transposition is most often used in parts that represent multiple
       * instruments.
       */
      number: t.optional(dataTypes.staffNumber()),
    },
    content: [t.optional(Diatonic), t.required(Chromatic), t.optional(OctaveChange), t.optional(Double)] as const,
  },
  {}
);
