import { t } from '../xml';

/**
 * The line-shape type distinguishes between straight and curved lines.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/line-shape/}
 */
export const lineShape = () => t.choices('straight' as const, 'curved' as const);
