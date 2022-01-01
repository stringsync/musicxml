import { t } from '../xml';

/**
 * The font-style type represents a simplified version of the
 * [CSS font-style property.](https://www.w3.org/TR/2018/REC-css-fonts-3-20180920/#font-prop-desc)
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/font-style/}
 */
export const fontStyle = () => t.choices('normal' as const, 'italic' as const);
