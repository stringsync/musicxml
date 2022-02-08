import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<mordent>` element
 *
 * Parent element: `<ornaments>`
 *
 * The `<mordent>` element represents the sign with the vertical line. The choice of which mordent sign is inverted
 * differs between MusicXML and the Standard Music Font Layout (SMuFL).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/mordent/}
 */
export const Mordent = schema(
  'mordent',
  {
    /**
     * If yes, the trill accelerates during playback. It is no if not specified.
     */
    accelerate: t.optional(dataTypes.yesNo()),

    /**
     * Used for compound ornaments, indicating how the beginning of the ornament look relative to the main part of the
     * mordent.
     */
    approach: t.optional(dataTypes.aboveBelow()),

    /**
     * The number of distinct notes during playback, counting the starting note but not the two-note turn. It is 3 if
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
    ['default-x']: t.label({ label: 'default-x', value: t.optional(dataTypes.tenths()) }),

    /**
     * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
     * staff. Positive y is up and negative y is down.
     */
    ['default-y']: t.label({ label: 'default-y', value: t.optional(dataTypes.tenths()) }),

    /**
     * Used for compound ornaments, indicating how the ending of the ornament look relative to the main part of the
     * mordent.
     */
    departure: t.optional(dataTypes.aboveBelow()),

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
     * The percentage of the way through the duration for landing on the last beat. It is 24 if not specified.
     */
    ['last-beat']: t.optional(dataTypes.percent()),

    /**
     * Specifies if the ornament is longer than usual. The value is no if not specified.
     */
    long: t.optional(dataTypes.yesNo()),

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
     * The percentage of the way through the duration for landing on the second beat. It is 12 if not specified.
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
  [] as const
);
