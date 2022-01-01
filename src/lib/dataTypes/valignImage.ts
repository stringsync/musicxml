import { t } from '../xml';

/**
 * The valign-image type is used to indicate vertical alignment for images and graphics, so it does not include a
 * baseline value. Defaults are implementation-dependent.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/valign-image/}
 */
export const valignImage = () => t.choices(...(['top', 'middle', 'bottom'] as const));
