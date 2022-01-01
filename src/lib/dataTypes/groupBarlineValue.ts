import { t } from '../xml';

/**
 * The group-barline-value type indicates if the group should have common barlines.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/group-barline-value/}
 */
export const groupBarlineValue = () => t.choices(...(['yes', 'no', 'Mensurstrich'] as const));
