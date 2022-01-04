import { t, xml } from '../xml';
import { TupletDot } from './TupletDot';
import { TupletNumber } from './TupletNumber';
import { TupletType } from './TupletType';

/**
 * The `<tuplet-actual>` element
 *
 * Parent element: `<tuplet>`
 *
 * The `<tuplet-actual>` element provide optional full control over how the actual part of the `<tuplet>` is displayed,
 * including number and note type (with dots). If any of these elements are absent, their values are based on the
 * `<time-modification>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/tuplet-actual/}
 */
export type TupletActual = ReturnType<typeof TupletActual>;

export const TupletActual = xml.element(
  'tuplet-actual',
  { attributes: {}, content: [t.optional(TupletNumber), t.optional(TupletType), t.zeroOrMore(TupletDot)] as const },
  {}
);
