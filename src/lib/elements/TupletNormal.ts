import { t, xml } from '../xml';
import { TupletDot } from './TupletDot';
import { TupletNumber } from './TupletNumber';
import { TupletType } from './TupletType';

/**
 * The `<tuplet-normal>` element
 *
 * Parent element: `<tuplet>`
 *
 * The `<tuplet-normal>` element provide optional full control over how the normal part of the `<tuplet>` is displayed,
 * including number and note type (with dots). If any of these elements are absent, their values are based on the
 * `<time-modification>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/tuplet-normal/}
 */
export type TupletNormal = ReturnType<typeof TupletNormal>;

export const TupletNormal = xml.element(
  'tuplet-normal',
  {
    attributes: {},
    content: [
      t.optional(TupletNumber),
      t.optional(TupletType),
      t.label({ label: 'tuplet-dots', value: t.zeroOrMore(TupletDot) }),
    ] as const,
  },
  {}
);
