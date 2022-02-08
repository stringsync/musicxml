import { t } from '../schema';
/**
 * The show-frets type indicates whether to show tablature frets as numbers (0, 1, 2) or letters (a, b, c). The default
 * choice is numbers.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/show-frets/}
 */
export const showFrets = () => t.choices('letters' as const, 'numbers' as const);
