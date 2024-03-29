import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<wavy-line>` element
 *
 * Parent elements: `<barline>`, `<ornaments>`
 *
 * Wavy lines are one way to indicate trills and vibrato.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/wavy-line/}
 */
export const WavyLine = schema(
  'wavy-line',
  {
    /**
     * Indicates if this is the start, stop, or continuation of the wavy line. The value should be continue whenever
     * used within a `<barline>` element.
     */
    type: t.required(dataTypes.startStopContinue()),

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
    ['default-x']: t.label({ label: 'default-x', value: t.optional(dataTypes.tenths()) }),

    /**
     * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
     * staff. Positive y is up and negative y is down.
     */
    ['default-y']: t.label({ label: 'default-y', value: t.optional(dataTypes.tenths()) }),

    /**
     * The percentage of the way through the duration for landing on the last beat. It is 75 if not specified.
     */
    ['last-beat']: t.optional(dataTypes.percent()),

    /**
     * Distinguishes multiple wavy lines when they overlap in MusicXML document order.
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
     * The percentage of the way through the duration for landing on the second beat. It is 25 if not specified.
     */
    ['second-beat']: t.optional(dataTypes.percent()),

    /**
     * Specifies a particular wavy line glyph from the Standard Music Font Layout (SMuFL)
     * [Multi-segment lines](https://www.w3.org/2021/03/smufl14/tables/multi-segment-lines.html) range.
     */
    smufl: t.optional(dataTypes.smuflWavyLineGlyphName()),

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
