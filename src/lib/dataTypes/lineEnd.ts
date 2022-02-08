import { t } from '../schema';
/**
 * The line-end type specifies if there is a jog up or down (or both), an arrow, or nothing at the start or end of a
 * bracket.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/line-end/}
 */
export const lineEnd = () => t.choices(...(['none', 'up', 'down', 'both', 'arrow'] as const));
