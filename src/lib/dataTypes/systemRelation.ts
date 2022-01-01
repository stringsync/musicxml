import { t } from '../xml';

/**
 * The system-relation type distinguishes elements that are associated with a system rather than the particular part
 * where the element appears.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/system-relation/}
 */
export const systemRelation = () => t.choices(...(['none', 'only-top', 'also-top'] as const));
