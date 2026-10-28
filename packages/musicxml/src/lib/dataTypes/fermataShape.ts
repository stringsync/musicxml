import { t } from '../schema';
/**
 * The fermata-shape type represents the shape of the fermata sign.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/fermata-shape/}
 */
export const fermataShape = () => {
  return t.label({
    label: 'fermata-shape',
    value: t.choices(
      ...([
        '',
        'normal',
        'angled',
        'square',
        'double-angled',
        'double-square',
        'double-dot',
        'half-curve',
        'curlew',
      ] as const)
    ),
  });
};
