import { t } from '../schema';
/**
 * The arrow-direction type represents the direction in which an arrow points, using Unicode arrow terminology.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/arrow-direction/}
 */
export const arrowDirection = () => {
  return t.label({
    label: 'arrow-directions',
    value: t.choices(
      ...([
        'down',
        'left',
        'left right',
        'northeast',
        'northeast southwest',
        'northwest',
        'northwest southeast',
        'other',
        'right',
        'southeast',
        'southwest',
        'up',
        'up down',
      ] as const)
    ),
  });
};
