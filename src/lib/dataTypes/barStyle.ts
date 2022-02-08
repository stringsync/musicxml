import { t } from '../schema';
/**
 * The bar-style type represents barline style information. Choices are regular, dotted, dashed, heavy, light-light,
 * light-heavy, heavy-light, heavy-heavy, tick (a short stroke through the top line), short (a partial barline between
 * the 2nd and 4th lines), and none.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/bar-style/}
 */
export const barStyle = () => {
  return t.label({
    label: 'bar-style',
    value: t.choices(
      ...([
        'none',
        'dashed',
        'dotted',
        'heavy',
        'heavy-heavy',
        'heavy-light',
        'light-heavy',
        'light-light',
        'regular',
        'short',
        'tick',
      ] as const)
    ),
  });
};
