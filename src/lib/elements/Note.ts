import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<note>` element
 *
 * Parent elements: `<measure>` (partwise), `<part>` (timewise)
 *
 * Notes are the most common type of MusicXML data. The MusicXML format distinguishes between elements used for sound
 * information and elements used for notation information (e.g., `<tie>` is used for sound, `<tied>` for notation).
 * Thus grace notes do not have a `<duration>` element. Cue notes have a `<duration>` element, as do `<forward>`
 * elements, but no `<tie>` elements. Having these two types of information available can make interchange easier, as
 * some programs handle one type of information more readily than the other.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/note/}
 */
export type Note = ReturnType<typeof Note>;

export const Note = xml.element(
  'note',
  {
    attributes: {
      /**
       * Alters the starting time of the note from when it would otherwise occur based on the flow of durations -
       * information that is specific to a performance. It is expressed in terms of divisions, either positive or
       * negative. A `<note>` that stops a tie should not have an attack attribute. The attack and release attributes
       * are independent of each other. The attack attribute only changes the starting time of a note.
       */
      attack: t.optional(dataTypes.divisions()),

      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),
    },
    content: [] as const,
  },
  {}
);
