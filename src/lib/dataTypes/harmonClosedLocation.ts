import { t } from '../xml';

/**
 * The harmon-closed-location type indicates which portion of the symbol is filled in when the corresponding
 * harmon-closed-value is half.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/harmon-closed-location/}
 */
export const harmonClosedLocation = () => t.choices(...(['bottom', 'left', 'right', 'top'] as const));
