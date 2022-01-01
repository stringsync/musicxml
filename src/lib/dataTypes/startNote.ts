import { t } from '../xml';

/**
 * The start-note type describes the starting note of trills and mordents for playback, relative to the current note.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/start-note/}
 */
export const startNote = () => t.choices(...(['below', 'main', 'upper'] as const));
