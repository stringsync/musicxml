import { t } from '../schema';
/**
 * The line-type type distinguishes between solid, dashed, dotted, and wavy lines.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/line-type/}
 */
export const lineType = () => t.choices(...(['dashed', 'dotted', 'solid', 'wavy'] as const));
