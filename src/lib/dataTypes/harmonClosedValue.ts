import { t } from '../xml';

/**
 * The harmon-closed-value type represents whether the harmon mute is closed, open, half-open.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/harmon-closed-value/}
 */
export const harmonClosedValue = () => t.choices(...(['yes', 'no', 'half'] as const));
