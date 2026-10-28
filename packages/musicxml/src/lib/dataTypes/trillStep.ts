import { t } from '../schema';
/**
 * The trill-step type describes the alternating note of trills and mordents for playback, relative to the current note.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/trill-step/}
 */
export const trillStep = () => t.choices('unison', 'half', 'whole');
