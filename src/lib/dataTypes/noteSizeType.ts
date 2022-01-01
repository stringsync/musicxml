import { t } from '../xml';

/**
 * The note-size-type type indicates the type of note size being defined by a `<note-size>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/note-size-type/}
 */
export const noteSizeType = () => t.choices(...(['cue', 'grace', 'grace-cue', 'large'] as const));
