import { t } from '../schema';
/**
 * The right-left-middle type is used to specify barline location.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/right-left-middle/}
 */
export const rightLeftMiddle = () => t.choices(...(['right', 'left', 'middle'] as const));
