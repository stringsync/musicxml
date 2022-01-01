import { t } from '../xml';

/**
 * The valign type is used to indicate vertical alignment to the top, middle, bottom, or baseline of the text. Defaults
 * are implementation-dependent.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/valign/}
 */
export const valign = () => t.choices(...(['top', 'middle', 'bottom', 'baseline'] as const));
