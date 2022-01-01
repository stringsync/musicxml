import { t } from '../xml';

/**
 * The up-down type is used for the direction of arrows and other pointed symbols like vertical accents, indicating
 * which way the tip is pointing.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/up-down/}
 */
export const upDown = () => t.choices('up' as const, 'down' as const);
