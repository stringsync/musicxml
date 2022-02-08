import { t } from '../schema';
import { cssFontSize } from './cssFontSize';
/**
 * The font-size can be one of the
 * [CSS font sizes](https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/css-font-size/) or a
 * [decimal](https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/xsd-decimal/) point size.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/font-size/}
 */
export const fontSize = () => t.choices(cssFontSize(), t.float());
