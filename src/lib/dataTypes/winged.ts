import { t } from '../xml';

/**
 * The winged attribute indicates whether the repeat has winged extensions that appear above and below the barline. The
 * straight and curved values represent single wings, while the double-straight and double-curved values represent
 * double wings. The none value indicates no wings and is the default.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/winged/}
 */
export const winged = () => t.choices(...(['none', 'straight', 'curved', 'double-straight', 'double-curved'] as const));
