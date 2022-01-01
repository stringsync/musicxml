import { t } from '../xml';

/**
 * The distance-type defines what type of distance is being defined in a <distance> element. Values include:
 *
 * - beam
 * - hyphen
 *
 * This is left as a string so that other application-specific types can be defined, but it is made a separate type so
 * that it can be redefined more strictly.
 *
 * The beam type represents the distance between beam. The hyphen type represents the distance between hyphens in lyrics.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/distance-type/}
 */
export const distanceType = () => t.choices('beam' as const, 'hyphen' as const);
