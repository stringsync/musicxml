import { t } from '../xml';

/**
 * The over-under type is used to indicate whether the tips of curved lines such as slurs and ties are overhand
 * (tips down) or underhand (tips up).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/over-under/}
 */
export const overUnder = () => t.choices('over' as const, 'under' as const);
