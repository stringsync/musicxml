import { schema, t } from '../schema';
import { First } from './First';
import { Second } from './Second';
import { Straight } from './Straight';
import { SwingStyle } from './SwingStyle';
import { SwingType } from './SwingType';

/**
 * The `<swing>` element
 *
 * Parent element: `<sound>`
 *
 * The `<swing>` element specifies whether or not to use swing playback, where consecutive on-beat / off-beat eighth or
 * 16th notes are played with unequal nominal durations.
 *
 * The `<first>` and `<second>` elements are positive integers that specify the ratio between durations of consecutive
 * notes. For example, a `<first>` element with a value of 2 and a `<second>` element with a value of 1 applied to
 * eighth notes specifies a quarter note / eighth note tuplet playback, where the first note is twice as long as the
 * second note. Ratios should be specified with the smallest integers possible. For example, a ratio of 6 to 4 should be
 * specified as 3 to 2 instead.
 *
 * The `<swing>` element has no effect for playback of grace notes, notes where a `<type>` element is not present, and
 * notes where the specified `<duration>` is different than the nominal value associated with the specified `<type>`. If
 * a swung note has attack and release attributes, those values modify the swung playback.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/swing/}
 */
export const Swing = schema('swing', {}, [
  t.label({
    label: 'swing',
    value: t.choices(Straight, [t.required(First), t.required(Second), t.optional(SwingType)] as const),
  }),
  t.optional(SwingStyle),
] as const);
