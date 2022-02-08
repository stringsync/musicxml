import { t } from '../schema';
/**
 * The trill-beats type specifies the beats used in a trill-sound or bend-sound attribute group. It is a decimal value
 * with a minimum value of 2.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/trill-beats/}
 */
export const trillBeats = () => t.float({ min: 2 });
