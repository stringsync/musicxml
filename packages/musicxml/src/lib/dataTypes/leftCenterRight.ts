import { t } from '../schema';
/**
 * The left-center-right type is used to define horizontal alignment and text justification.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/left-center-right/}
 */
export const leftCenterRight = () => t.choices(...(['left', 'center', 'right'] as const));
