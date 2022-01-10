import { t, xml } from '../xml';
import { Chromatic } from './Chromatic';
import { Diatonic } from './Diatonic';
import { Double } from './Double';
import { OctaveChange } from './OctaveChange';

/**
 * The `<part-transpose>` element
 *
 * Parent element: `<for-part>`
 *
 * The child elements of the `<part-transpose>` element have the same meaning as for the `<transpose>` element. However
 * that meaning applies to a transposed part created from the existing score file.
 *
 * The `<chromatic>` element in a `<part-transpose>` element will usually have a non-zero value, since octave
 * transpositions can be represented in concert scores using the `<transpose>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/part-transpose/}
 */
export type PartTranspose = ReturnType<typeof PartTranspose>;

export const PartTranspose = xml.element(
  'part-transpose',
  {
    attributes: {},
    content: [t.optional(Diatonic), t.required(Chromatic), t.optional(OctaveChange), t.optional(Double)] as const,
  },
  {}
);
