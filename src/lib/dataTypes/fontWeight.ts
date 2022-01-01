import { t } from '../xml';

/**
 * The font-weight type represents a simplified version of the
 * [CSS font-weight property.](https://www.w3.org/TR/2018/REC-css-fonts-3-20180920/#font-prop-desc)
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/font-weight/}
 */
export const fontWeight = () => t.choices('normal' as const, 'bold' as const);
