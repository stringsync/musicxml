import { t } from '../schema';
/**
 * The fan type represents the type of beam fanning present on a note, used to represent accelerandos and ritardandos.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/fan/}
 */
export const fan = () => t.choices(...(['accel', 'none', 'rit'] as const));
