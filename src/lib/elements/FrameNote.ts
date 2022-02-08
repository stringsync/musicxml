import { schema, t } from '../schema';
import { Barre } from './Barre';
import { Fingering } from './Fingering';
import { Fret } from './Fret';
import { String } from './String';

/**
 * The `<frame-note>` element
 *
 * Parent element: `<frame>`
 *
 * The frame-note type represents each note included in the frame. An open string will have a fret value of 0, while a
 * muted string will not be associated with a frame-note element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/frame-note/}
 */
export const FrameNote = schema('frame-note', {}, [
  t.required(String),
  t.required(Fret),
  t.optional(Fingering),
  t.optional(Barre),
] as const);
