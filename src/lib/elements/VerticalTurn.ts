import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<vertical-turn>` element
 *
 * Parent element: `<ornaments>`
 *
 * The `<vertical-turn>` element has the turn symbol shape arranged vertically going from upper left to lower right.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/vertical-turn/}
 */
export type VerticalTurn = ReturnType<typeof VerticalTurn>;

export const VerticalTurn = xml.element(
  'vertical-turn',
  {
    attributes: {
      /**
       * If yes, the trill accelerates during playback. It is no if not specified.
       */
      accelerate: t.optional(dataTypes.yesNo()),

      /**
       * The number of distinct notes during playback, counting the starting note but not the two-note turn. It is 4 if
       * not specified.
       */
      beats: t.optional(dataTypes.trillBeats()),

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
       * A comma-separated list of font names.
       */
      ['font-family']: t.optional(dataTypes.fontFamily()),

      /**
       * One of the CSS sizes or a numeric point size.
       */
      ['font-size']: t.optional(dataTypes.fontSize()),

      /**
       * Normal or italic style.
       */
      ['font-style']: t.optional(dataTypes.fontStyle()),

      /**
       * Normal or bold weight.
       */
      ['font-weight']: t.optional(dataTypes.fontWeight()),

      /**
       * The percentage of the way through the duration for landing on the last beat. It is 75 if not specified.
       */
      ['last-beat']: t.optional(dataTypes.percent()),

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

      /**
       * The percentage of the way through the duration for landing on the second beat. It is 25 if not specified.
       */
      ['second-beat']: t.optional(dataTypes.percent()),

      /**
       * The starting note for playback, relative to the current note. It is upper if not specified.
       */
      ['start-note']: t.optional(dataTypes.startNote()),

      /**
       * The alternating note for playback, relative to the current note. It is whole if not specified.
       */
      ['trill-step']: t.optional(dataTypes.trillStep()),

      /**
       * Specifies the two-note turn included at the end of the trill, if any. It is none if not specified.
       */
      ['two-note-turn']: t.optional(dataTypes.twoNoteTurn()),
    },
    content: [] as const,
  },
  {}
);
