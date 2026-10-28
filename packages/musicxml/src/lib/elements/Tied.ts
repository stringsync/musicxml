import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<tied>` element
 *
 * Parent element: `<notations>`
 *
 * The `<tied>` element represents the notated tie. The `<tie>` element represents the tie sound.
 *
 * Ties that join two notes of the same pitch together should be represented with a `<tied>` element on the first note
 * with type="start" and a `<tied>` element on the second note with type="stop". This can also be done if the two notes
 * being tied are enharmonically equivalent, but have different step values. It is not recommended to use `<tied>`
 * elements to join two notes with enharmonically inequivalent pitches.
 *
 * Ties that indicate that an instrument should be undamped are specified with a single `<tied>`
 * element with type="let-ring".
 *
 * Ties that are visually attached to only one note, other than undamped ties, should be specified with two `<tied>`
 * elements on the same note, first type="start" then type="stop". This can be used to represent ties into or out of
 * repeated sections or codas.
 *
 * When multiple `<tied>` elements with the same tag are used within the same note, their order within the MusicXML
 * document should match the musical score order. For example, a note with a tie at the end of a first ending should
 * have the `<tied>` element with a type of start precede the `<tied>` element with a type of stop.
 *
 * Normal ties need only two bezier points: one associated with the start of the tie, the other with the stop. Ties
 *  divided over system breaks can specify additional bezier data at `<tied>` elements with a continue type.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/tied/}
 */
export const Tied = schema(
  'tied',
  {
    /**
     * Indicates if this is the start, stop, or continuation of a tie, or if this is a tie indicating that an
     * instrument should be undamped.
     */
    type: t.required(dataTypes.tiedType()),

    /**
     * The horizontal position of an outgoing bezier point for slurs and ties with a start type, or of an incoming
     * bezier point for slurs and ties with types of stop or continue.
     */
    ['bezier-x']: t.optional(dataTypes.tenths()),

    /**
     * The horizontal position of an outgoing bezier point for slurs with a continue type. Not valid for other types.
     */
    ['bezier-x2']: t.optional(dataTypes.tenths()),

    /**
     * The vertical position of an outgoing bezier point for slurs and ties with a start type, or of an incoming
     * bezier point for slurs and ties with types of stop or continue.
     */
    ['bezier-y']: t.optional(dataTypes.tenths()),

    /**
     * The vertical position of an outgoing bezier point for slurs with a continue type. Not valid for other types.
     */
    ['bezier-y2']: t.optional(dataTypes.tenths()),

    /**
     * Indicates the color of an element.
     */
    color: t.optional(dataTypes.color()),

    /**
     * The length of dashes in a dashed line. Ignored if the corresponding line-type attribute is not dashed.
     */
    ['dash-length']: t.optional(dataTypes.tenths()),

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
     * Specifies an ID that is unique to the entire document.
     */
    id: t.optional(dataTypes.id()),

    /**
     * Specifies if the line is solid, dashed, dotted, or wavy.
     */
    ['line-type']: t.optional(dataTypes.lineType()),

    /**
     * Rarely needed to disambiguate ties, since note pitches will usually suffice. It is available for use in more
     * complex tied notation situations.
     */
    number: t.optional(dataTypes.numberLevel()),

    /**
     * Indicates whether slurs and ties are overhand (tips down) or underhand (tips up). This is distinct from the
     * placement attribute used by any notation type.
     */
    orientation: t.optional(dataTypes.overUnder()),

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
     * The length of spaces in a dashed line. Ignored if the corresponding line-type attribute is not dashed.
     */
    ['space-length']: t.optional(dataTypes.tenths()),
  },
  [] as const
);
