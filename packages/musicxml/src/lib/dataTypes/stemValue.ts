import { t } from '../schema';
/**
 * The stem-value type represents the notated stem direction.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/stem-value/}
 */
export const stemValue = () => t.choices(...(['none', 'down', 'up', 'double'] as const));
