import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<note-size>` element
 *
 * Parent element: `<appearance>`
 *
 * The `<note-size>` element indicates the numeric percentage of the regular note size to use for notes with cue and
 * large size, as defined in the `<type>` element. A value of 100 would be identical to the size of a regular note as
 * defined by the music font.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/note-size/}
 */
export const NoteSize = schema(
  'note-size',
  {
    /**
     * The type of note size being defined.
     */
    type: t.required(dataTypes.noteSizeType()),
  },
  [] as const
);
