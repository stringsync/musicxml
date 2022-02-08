import { t } from '../schema';
/**
 * The tip-direction type represents the direction in which the tip of a stick or beater points, using Unicode arrow
 * terminology.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/tip-direction/}
 */
export const tipDirection = () => {
  return t.choices(...(['down', 'left', 'northeast', 'northwest', 'right', 'southeast', 'southwest', 'up'] as const));
};
