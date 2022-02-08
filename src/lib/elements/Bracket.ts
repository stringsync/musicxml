import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<bracket>` element
 *
 * Parent element: `<direction-type>`
 *
 * Brackets are combined with words in a variety of modern directions. The line-type is solid if not specified.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/bracket/}
 */
export const Bracket = schema(
  'bracket',
  {
    /**
     * Specifies if there is a jog up or down (or both), an arrow, or nothing at the start or end of the bracket.
     */
    ['line-end']: t.required(dataTypes.lineEnd()),

    /**
     * Indicates if this is the start, stop, or continuation of the bracket.
     */
    type: t.required(dataTypes.startStopContinue()),

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
     * Specifies the length of the jog if the line-end attribute is up or down.
     */
    ['end-length']: t.optional(dataTypes.tenths()),

    /**
     * Specifies an ID that is unique to the entire document.
     */
    id: t.optional(dataTypes.id()),

    /**
     * Specifies if the line is solid, dashed, dotted, or wavy.
     */
    ['line-type']: t.optional(dataTypes.lineType()),

    /**
     * Distinguishes multiple brackets when they overlap in MusicXML document order.
     */
    number: t.optional(dataTypes.numberLevel()),

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
