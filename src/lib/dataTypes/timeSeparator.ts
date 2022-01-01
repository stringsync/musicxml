import { t } from '../xml';

/**
 * The time-separator type indicates how to display the arrangement between the beats and beat-type values in a time
 * signature. The default value is none. The horizontal, diagonal, and vertical values represent horizontal, diagonal
 * lower-left to upper-right, and vertical lines respectively. For these values, the beats and beat-type values are
 * arranged on either side of the separator line. The none value represents no separator with the beats and beat-type
 * arranged vertically. The adjacent value represents no separator with the beats and beat-type arranged horizontally.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/time-separator/}
 */
export const timeSeparator = () => {
  return t.choices(...(['none', 'adjacent', 'diagonal', 'horizontal', 'vertical'] as const));
};
