import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<arpeggiate>` element
 *
 * Parent element: `<notations>`
 *
 * The `<arpeggiate>` element indicates that this note is part of an arpeggiated chord. The length of the sign can be
 * determined from the position attributes for the `<arpeggiate>` elements used with the top and bottom notes of the
 * arpeggiated chord.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/arpeggiate/}
 */
export type Arpeggiate = ReturnType<typeof Arpeggiate>;

export const Arpeggiate = xml.element(
  'arpeggiate',
  {
    attributes: {
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
      ['default-x']: t.label({ label: 'default-x', value: t.optional(dataTypes.tenths()) }),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
       * staff. Positive y is up and negative y is down.
       */
      ['default-y']: t.label({ label: 'default-y', value: t.optional(dataTypes.tenths()) }),

      /**
       * Used if there is an arrow on the arpeggio sign. By default, arpeggios go from the lowest to highest note.
       */
      direction: t.optional(dataTypes.upDown()),

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
      ['relative-x']: t.label({ label: 'relative-x', value: t.optional(dataTypes.tenths()) }),

      /**
       * Changes the vertical position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-y attribute. Positive y is up and negative y is down.
       */
      ['relative-y']: t.label({ label: 'relative-y', value: t.optional(dataTypes.tenths()) }),

      /**
       * If yes, indicates that the arpeggio continues onto another staff within the part. This serves as a hint to
       * applications and is not required for cross-staff arpeggios.
       */
      unbroken: t.optional(dataTypes.yesNo()),
    },
    content: [] as const,
  },
  {}
);
