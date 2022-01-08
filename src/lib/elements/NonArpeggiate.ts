import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<non-arpeggiate>` element
 *
 * Parent element: `<notations>`
 *
 * The `<non-arpeggiate>` element indicates that this `<note>` is at the top or bottom of a bracket indicating to not
 * arpeggiate these notes. Since this does not involve playback, it is only used on the top or bottom notes, not on each
 * `<note>` as for the `<arpeggiate>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/non-arpeggiate/}
 */
export type NonArpeggiate = ReturnType<typeof NonArpeggiate>;

export const NonArpeggiate = xml.element(
  'non-arpeggiate',
  {
    attributes: {
      /**
       * Indicates whether this is the top or bottom of the symbol.
       */
      type: t.required(dataTypes.topBottom()),

      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

      /**
       * Changes the computation of the default horizontal position. If the parent is a `<notehead-text>` element, the
       * origin is changed relative to the left-hand side of the note or the musical position within the bar. Otherwise,
       * the origin is changed relative to the start of the first measure on the system, and these values are used when
       * the current measure or a succeeding measure starts a new system. Positive x is right and negative x is left.
       */
      ['default-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
       * staff. Positive y is up and negative y is down.
       */
      ['default-y']: t.optional(dataTypes.tenths()),

      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

      /**
       * Used to distinguish between two simultaneous chords arpeggiated separately (different numbers) or together
       * (same number).
       */
      number: t.optional(dataTypes.numberLevel()),

      /**
       * Indicates whether something is above or below another element, such as a note or a notation.
       */
      placement: t.optional(dataTypes.aboveBelow()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-x attribute. Positive x is right and negative x is left.
       */
      ['relative-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the vertical position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-y attribute. Positive y is up and negative y is down.
       */
      ['relative-y']: t.optional(dataTypes.tenths()),
    },
    content: [] as const,
  },
  {}
);
