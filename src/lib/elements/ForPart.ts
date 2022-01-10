import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { PartClef } from './PartClef';
import { PartTranspose } from './PartTranspose';

/**
 * The `<for-part>` element
 *
 * Parent element: `<attributes>`
 *
 * The `<for-part>` element is used in a concert score to indicate the transposition for a transposed part created from
 * that score. It is only used in score files that contain a `<concert-score>` element in the `<defaults>` element. This
 * allows concert scores with transposed parts to be represented in a single uncompressed MusicXML file.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/for-part/}
 */
export type ForPart = ReturnType<typeof ForPart>;

export const ForPart = xml.element(
  'for-part',
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
    content: [t.optional(PartClef), t.required(PartTranspose)] as const,
  },
  {}
);
