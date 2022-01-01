import { t } from '../xml';

/**
 * The margin-type type specifies whether margins apply to even page, odd pages, or both.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/margin-type/}
 */
export const marginType = () => t.choices(...(['both', 'even', 'odd'] as const));
