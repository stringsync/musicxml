import { t } from '../xml';

/**
 * The line-width-type defines what type of line is being defined in a <line-width> element. Values include:
 *
 * - beam
 * - bracket
 * - dashes
 * - enclosure
 * - ending
 * - extend
 * - heavy barline
 * - leger
 * - light barline
 * - octave shift
 * - pedal
 * - slur middle
 * - slur tip
 * - staff
 * - stem
 * - tie middle
 * - tie tip
 * - tuplet bracket
 * - wedge
 *
 * This is left as a string so that other application-specific types can be defined, but it is made a separate type so that it can be redefined more strictly.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/line-width-type/}
 */
export const lineWidthType = () => {
  return t.choices(
    ...([
      'beam',
      'bracket',
      'dashes',
      'enclosure',
      'ending',
      'extend',
      'heavy barline',
      'leger',
      'light barline',
      'octave shift',
      'pedal',
      'slur middle',
      'slur tip',
      'staff',
      'stem',
      'tie middle',
      'tie tip',
      'tuplet bracket',
      'wedge',
    ] as const)
  );
};
