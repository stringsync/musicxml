import { t } from '../schema';
/**
 * The semi-pitched type represents categories of indefinite pitch for percussion instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/semi-pitched/}
 */
export const semiPitched = () => {
  return t.label({
    label: 'semi-pitched',
    value: t.choices(...(['high', 'low', 'medium', 'medium-high', 'medium-low', 'very-low'] as const)),
  });
};
