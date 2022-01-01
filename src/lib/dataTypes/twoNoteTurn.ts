import { t } from '../xml';

/**
 * The two-note-turn type describes the ending notes of trills and mordents for playback, relative to the current note.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/two-note-turn/}
 */
export const twoNoteTurn = () => t.choices(...(['none', 'whole', 'half'] as const));
