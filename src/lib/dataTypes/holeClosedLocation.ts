import { t } from '../schema';
/**
 * The hole-closed-location type indicates which portion of the hole is filled in when the corresponding
 * hole-closed-value is half.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/hole-closed-location/}
 */
export const holeClosedLocation = () => t.choices(...(['bottom', 'left', 'right', 'top'] as const));
