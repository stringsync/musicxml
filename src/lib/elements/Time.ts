import { t, xml } from '../xml';
import { Beats } from './Beats';
import { BeatType } from './BeatType';
import { Interchangeable } from './Interchangeable';
import { SenzaMisura } from './SenzaMisura';

/**
 * The `<time>` element
 *
 * Parent element: `<attributes>`
 *
 * Time signatures are represented by the `<beats>` element for the numerator and the `<beat-type>` element for the
 * denominator. Multiple pairs of `<beat>` and `<beat-type>` elements are used for composite time signatures with
 * multiple denominators, such as 2/4 + 3/8. A composite such as 3+2/8 requires only one `<beat>`/`<beat-type>` pair.
 *
 * The print-object attribute allows a time signature to be specified but not printed, as is the case for excerpts from
 * the middle of a score. The value is "yes" if not present.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/time/}
 */
export type Time = ReturnType<typeof Time>;

export const Time = xml.element(
  'time',
  {
    attributes: {},
    content: [
      t.choices(
        [t.oneOrMore([t.required(Beats), t.required(BeatType)]), t.optional(Interchangeable)] as const,
        SenzaMisura
      ),
    ] as const,
  },
  {}
);
