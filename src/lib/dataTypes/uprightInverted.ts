import { t } from '../xml';

/**
 * The upright-inverted type describes the appearance of a fermata element. The value is upright if not specified.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/upright-inverted/}
 */
export const uprightInverted = () => t.choices('upright' as const, 'inverted' as const);
