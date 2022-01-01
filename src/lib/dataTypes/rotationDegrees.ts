import { t } from '../xml';

/**
 * The rotation-degrees type specifies rotation, pan, and elevation values in degrees. Values range from -180 to 180.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/rotation-degrees/}
 */
export const rotationDegrees = () => t.range({ min: -180, max: 180 });
