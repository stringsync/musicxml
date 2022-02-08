import { t } from '../schema';
/**
 * The arrow-style type represents the style of an arrow, using Unicode arrow terminology. Filled and hollow arrows
 * indicate polygonal single arrows. Paired arrows are duplicate single arrows in the same direction. Combined arrows
 * apply to double direction arrows like left right, indicating that an arrow in one direction should be combined with
 * an arrow in the other direction.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/arrow-style/}
 */
export const arrowStyle = () => {
  return t.label({
    label: 'arrow-style',
    value: t.choices(...(['combined', 'double', 'filled', 'hollow', 'other', 'paired', 'single'] as const)),
  });
};
